var mongoose = require('mongoose');

module.exports = function(app) {

    var ArticleSchema = new mongoose.Schema({
        title               : {type: String},
        content             : {type: String},
        pictures            : [{type: Buffer}],
        category            : {type: String, enum: ['WTF', 'Captain Obvious', 'Fais pas si, fais pas ça', 'Hors concours']},
        mantisOwner         : {type: String},
        publisher           : {type: mongoose.Schema.Types.ObjectId},
        isActive            : {type: Boolean, default: true},
        like                : {type: Number, default: 0},
        comments            : [{
                                user      : { type: mongoose.Schema.Types.ObjectId },
                                content   : { type: String },
                                createdAt : { type: Date }
                              }],
        createdAt           : {type: Date, default: new Date()},
        updatedAt           : {type: Date}
    });

    ArticleSchema.pre('update', function() {
      this.update({},{ $set: { updatedAt: new Date() } });
    });


    var ArticleModel = mongoose.model('Articles', ArticleSchema);

    return ArticleModel;
}
