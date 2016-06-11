var mongoose = require('mongoose');

module.exports = function(app) {

    var UserSchema = new mongoose.Schema({
        login               : {type: String},
        password            : {type: String},
        isActive            : {type: Boolean, default: true},
        createdAt           : {type: Date, default: new Date()},
        updatedAt           : {type: Date}
    });


    var UserModel = mongoose.model('Users', UserSchema);

    return UserModel;
}
