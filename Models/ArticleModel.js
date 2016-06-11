var mongoose = require('mongoose');

module.exports = function(app) {

    var ArticleSchema = new mongoose.Schema({
        title               : {type: String},
        content             : {type: String},
        pictures            : [{type: Buffer}],
        mantisOwner         : {type: String},
        publisher           : {type: Schema.Types.ObjectId},
        isActive            : {type: Boolean, default: true},
        createdAt           : {type: Date, default: new Date()},
        updatedAt           : {type: Date}
    });


    var ArticleModel = mongoose.model('Articles', ArticleSchema);

    return ArticleModel;
}
