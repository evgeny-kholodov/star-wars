import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    "planetId": {type: mongoose.Schema.Types.ObjectId, ref: 'Planet'},
    "score": Number,
    "comment": String,
    "userId": String
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports.modelComment = Comment;
