/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
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
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const SaveBlog = mongoose.model('saveBlog', blogSchema);

module.exports = SaveBlog;
