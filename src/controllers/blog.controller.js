/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { blogService  } = require('../services');

const createBlog = catchAsync(async (req, res) => {
  const blog = await blogService.createBlogForUserWithUserId(req.body.content , req.user._id);
  res.status(httpStatus.CREATED).send({ blog });
});

const editBlog = catchAsync(async (req, res) => {
   await blogService.editBlogForUserWithBlogId(req.body , req.params.blogId);
  res.status(httpStatus.CREATED).send({ message : 'Blog updated successfully' });
});

const deleteBlog = catchAsync(async (req, res) => {
   await blogService.deleteBlogForUserWithBlogId(req.params.blogId);
  res.status(httpStatus.OK).send({ message : 'Blog deleted successfully' });
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogForUserWithBlogId(req.params.blogId);
  res.status(httpStatus.OK).send({ blog });
});

const getAllBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getALlBlogForUser(req.body);
  res.status(httpStatus.OK).send({ blog });
});

const getBlogForLoginUser = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogForLoginUserWithUserId(req.body ,req.user._id);
  res.status(httpStatus.OK).send({ blog });
});

const likeBlog = catchAsync(async (req, res) => {
  await blogService.likeBlogWithBlogId(req.params.blogId, req.user._id);
 res.status(httpStatus.OK).send({ message : 'Blog liked' });
});

const unlikeBlog = catchAsync(async (req, res) => {
 await blogService.unlikeBlogWithBlogId(req.params.blogId, req.user._id);
 res.status(httpStatus.OK).send({ message : 'Blog unliked' });
});

const saveBlog = catchAsync(async (req, res) => {
  await blogService.saveBlogWithBlogId(req.params.blogId, req.user._id);
 res.status(httpStatus.OK).send({ message : 'Blog saved' });
});

const unsaveBlog = catchAsync(async (req, res) => {
 await blogService.unsaveBlogWithBlogId(req.params.blogId, req.user._id);
 res.status(httpStatus.OK).send({ message : 'Blog unsaved' });
});
module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
  getBlog,
  getAllBlog,
  getBlogForLoginUser,
  likeBlog,
  unlikeBlog,
  saveBlog,
  unsaveBlog,
};
