/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');
const { blogController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(auth(), validate(blogValidation.createBlog), blogController.createBlog)

router
    .route('/all')
    .post(auth(), validate(blogValidation.getAllBlog), blogController.getAllBlog)

router
    .route('/self')
    .post(auth(), validate(blogValidation.getAllBlog), blogController.getBlogForLoginUser)

router
    .route('/like/:blogId')
    .get(auth(), validate(blogValidation.likeBlog), blogController.likeBlog)

router
    .route('/unlike/:blogId')
    .get(auth(), validate(blogValidation.likeBlog), blogController.unlikeBlog)

router
    .route('/save/:blogId')
    .get(auth(), validate(blogValidation.likeBlog), blogController.saveBlog)

router
    .route('/unsave/:blogId')
    .get(auth(), validate(blogValidation.likeBlog), blogController.unsaveBlog)

router
    .route('/:blogId')
    .get(auth(), validate(blogValidation.likeBlog), blogController.getBlog)
    .patch(auth(), validate(blogValidation.editBlog), blogController.editBlog)
    .delete(auth(), validate(blogValidation.likeBlog), blogController.deleteBlog);

module.exports = router;
