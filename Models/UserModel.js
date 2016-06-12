var mongoose = require('mongoose');

module.exports = function(app) {

    var UserSchema = new mongoose.Schema({
        login               : {type: String},
        password            : {type: String},
        apikey              : {type: String},
        isAdmin             : {type: Boolean, default: false},
        isActive            : {type: Boolean, default: true},
        createdAt           : {type: Date, default: new Date()},
        updatedAt           : {type: Date}
    });

    UserSchema.pre('update', function() {
      this.update({},{ $set: { updatedAt: new Date() } });
    });

    var UserModel = mongoose.model('Users', UserSchema);

    return UserModel;
}
