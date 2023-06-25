/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const likeSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
likeSchema.plugin(toJSON);
likeSchema.plugin(paginate);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
