/* eslint-disable prettier/prettier */
const Joi = require('joi');
const {  objectId } = require('./custom.validation');

const createBlog = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};
const getAllBlog = {
  body: Joi.object().keys({
    paganation:Joi.object().keys({
        page : Joi.number().min(1),
        limit : Joi.number().min(1),
  }),
  }),
};

const editBlog = {
params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
}),

  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};

const likeBlog = {
params: Joi.object().keys({
    blogId: Joi.string().custom(objectId),
}),
};

module.exports = {
  createBlog,
  editBlog,
  likeBlog,
  getAllBlog,
};
