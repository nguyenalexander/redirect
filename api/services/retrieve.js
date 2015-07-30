var fs = require('fs');

module.exports = {
    all: function(print) {
        User.find().exec(function(err, users) {
            if(err) {
                console.log("ERROR:",err);
            } else {
                var usersJSON = users.map(function(user) {
                    console.log("Processing:",user.id)
                    var hashObj = {
                        iv: user.email.substr(0,24),
                        cipher_text: user.email.substr(24,user.email.length-24-172),
                        salt: user.email.substr(-172)
                    }
                    var userJSON = {
                        id: user.id,
                        email: encryption.decrypt(hashObj.cipher_text, process.env.HASH_PASSWORD, hashObj.salt, hashObj.iv),
                        name: user.name,
                        company: user.company,
                        version: user.version,
                    }
                    return userJSON;
                });

                if(print) {
                    console.log(JSON.stringify(usersJSON));
                } else {
                    var filename = Date.now() + '-datadump.json';

                    fs.writeFile(process.cwd() + '/' + filename, JSON.stringify(usersJSON), function(err) {
                        if(err) {
                            console.log("FILE WRITE ERROR:",err);
                        } else {
                            console.log("File saved:",filename)
                        }
                    });
                }
            }
        })
    },
    user: function(id, cb) {
        User.findOne({id: id}).exec(function(err, user) {
            if(err) {
                console.log("ERROR:",err);
                cb(err);
            } else {
                var hashObj = {
                    iv: user.email.substr(0,24),
                    cipher_text: user.email.substr(24,user.email.length-24-172),
                    salt: user.email.substr(-172)
                }
                var userJSON = {
                    id: user.id,
                    email: encryption.decrypt(hashObj.cipher_text, process.env.HASH_PASSWORD, hashObj.salt, hashObj.iv),
                    name: user.name,
                    company: user.company,
                    version: user.version,
                }
                cb(null,user);
            }
        });
    }
}