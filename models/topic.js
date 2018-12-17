var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentModel = require('./comment');


var TopicSchema = new Schema(
  {
    title: {type: String, required: true},
    comments: {type: [CommentModel.schema], required: false}
  }
);
//Export model
module.exports = mongoose.model('Topic', TopicSchema);