/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');

const PostComment = catchAsync(async (req, res) => {
  const blog = await commentService.postCommentForBlogWithBlogId(req.body, req.user._id);
  res.status(httpStatus.CREATED).send({ blog });
});

const editComment = catchAsync(async (req, res) => {
   await commentService.editCommentForBlogWithCommentId(req.params.commentId ,req.body);
  res.status(httpStatus.OK).send({ message : 'Comment updated successfully' });
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentForBlogWithCommentId(req.params.commentId);
  res.status(httpStatus.OK).send({ message : 'Comment deleted successfully' });
});

const getCommentsForBlog = catchAsync(async (req, res) => {
  const blog = await commentService.getCommentsForBlogWithBlogId(req.params.blogId,req.body);
  res.status(httpStatus.OK).send({ blog });
});

module.exports = {
  PostComment,
  editComment,
  deleteComment,
  getCommentsForBlog,
};
