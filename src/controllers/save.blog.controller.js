/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { saveBlogService } = require('../services');

const saveBlog = catchAsync(async (req, res) => {
   await saveBlogService.saveBlogWithBlogId(req.params.blogId, req.user._id);
  res.status(httpStatus.OK).send({ message : 'Blog saved' });
});

const unsaveBlog = catchAsync(async (req, res) => {
  await saveBlogService.unsaveBlogWithBlogId(req.params.blogId, req.user._id);
  res.status(httpStatus.OK).send({ message : 'Blog unsaved' });
});

module.exports = {
  saveBlog,
  unsaveBlog,
};
