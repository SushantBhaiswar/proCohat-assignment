/* eslint-disable prettier/prettier */
const Joi = require('joi');
const {  objectId } = require('./custom.validation');

const postComment = {
  body: Joi.object().keys({
    blogId: Joi.string().custom(objectId).required(),
    comment: Joi.string().required(),
  }),
};
const getCommentsForBlog = {
  params: Joi.object().keys({
  blogId: Joi.string().custom(objectId),
}),
    body: Joi.object().keys({
      paganation:Joi.object().keys({
          page : Joi.number().min(2),
          limit : Joi.number().min(1),
    }),
    }),
  };

const editComment = {
params: Joi.object().keys({
  commentId: Joi.string().custom(objectId),
}),

  body: Joi.object().keys({
    comment: Joi.string().required(),
  }),
};

const commentBlog = {
params: Joi.object().keys({
  commentId: Joi.string().custom(objectId),
}),
};

module.exports = {
  postComment,
  editComment,
  getCommentsForBlog,
  commentBlog,
};
