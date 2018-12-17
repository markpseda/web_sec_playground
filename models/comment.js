var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var CommentSchema = new Schema(
  {
    text: {type: String, required: true},
    user: {type: String, required: true},
    sub_comments: {type: [this], required: false},
    timeStamp: {type: Date, default: Date.now()}
  }
);
//Export model
module.exports = mongoose.model('Comment', CommentSchema);