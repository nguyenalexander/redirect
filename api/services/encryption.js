var forge = require('node-forge');

module.exports = {
    encrypt: function(string, password) {
        console.log("Begin encryption");
        var salt = forge.random.getBytesSync(128);
        var key = forge.pkcs5.pbkdf2(password, salt, 10, 16);
        var iv = forge.random.getBytesSync(16);
        var cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(string))
        cipher.finish();
        var cipherText = forge.util.encode64(cipher.output.getBytes());
        return {cipher_text: cipherText, salt: forge.util.encode64(salt), iv: forge.util.encode64(iv)};
    },

    decrypt: function(cipherText, password, salt, iv) {
        console.log("Begin decryption");
        var decodedSalt = forge.util.decode64(salt);
        // console.log("salt decoded");
        var decodedIv = forge.util.decode64(iv);
        // console.log("iv decoded");
        var decodedCipherText = forge.util.decode64(cipherText)
        // console.log("cipher text decoded");
        var key = forge.pkcs5.pbkdf2(password, decodedSalt, 10, 16);
        // console.log("key generated");
        var decipher = forge.cipher.createDecipher('AES-CBC', key);
        // console.log("decipher set");
        decipher.start({iv: decodedIv});
        // console.log("decipher started");
        decipher.update(forge.util.createBuffer(decodedCipherText));
        // console.log("decipher running");
        decipher.finish();
        // console.log("decipher finished");
        console.log(decipher.output.toString())
        return decipher.output.toString();
    }
}