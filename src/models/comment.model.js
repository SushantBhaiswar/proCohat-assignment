/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    blogId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Blog',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
