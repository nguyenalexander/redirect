/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res){
    var email = req.body.email,
        name = req.body.name,
        company = req.body.company


    if (req.body.email != undefined && req.body.name != undefined && req.body.company != undefined){
      User.create(req.body).then(function(user){
        res.send(user)
      })
    }else{
      res.send({userCreated: false, skipped: true})
    }
  }

};

