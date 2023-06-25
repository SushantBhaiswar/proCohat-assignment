/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const { commentController  } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(commentValidation.postComment), commentController.PostComment)

  
  router
    .route('/:blogId')
    .get(auth(), validate(commentValidation.getCommentsForBlog), commentController.getCommentsForBlog)
    router
    .route('/:commentId')
    .patch(auth(), validate(commentValidation.editComment), commentController.editComment)
    .delete(auth(), validate(commentValidation.commentBlog), commentController.deleteComment);

module.exports = router;
