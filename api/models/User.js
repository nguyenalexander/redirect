/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Cryptr = require("cryptr"),
    cryptr = new Cryptr('tw1tt3rmaf1a')

module.exports = {

  attributes: {

    email: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    showTimer: {
      type: 'boolean'
    },
    version: {
      type: 'string'
    }
  },

  beforeCreate: function (values, cb) {
    // Encrypt email
    console.log('before hash',values.email)
    var hashEmail = cryptr.encrypt(values.email);
    console.log('after hash',hashEmail)
    values.email = hashEmail
    cb();
  }
};

