/**
 * Created by vemulma on 1/31/2017.
 */

const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
   name : String,
   username : String,
   email : String,
   password : String
});

studentSchema.pre('save', function (next){
    var newUser = this;

    bcrypt.hash(newUser.password, null, null, function(err, newPassword){
        if(err) throw err.message;
        newUser.password = newPassword;
        next();
    });

});


module.exports = mongoose.model('users',studentSchema);
