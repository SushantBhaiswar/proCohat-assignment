/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const {Blog, Comment,Like, SaveBlog} = require("../models")
/**
 * Create user blog with userId
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const createBlogForUserWithUserId = async (content, userId) => {
 const createdBlog  = await Blog.create({content , userId});
 return createdBlog;
};

const deleteBlogForUserWithBlogId = async (blogId) => {
 const findBlog  = await Blog.findOne({_id : blogId});
 if(!findBlog)
 throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
 await Comment.deleteMany({blogId})
 await Like.deleteMany({blogId})
 await findBlog.remove(); 
};

const editBlogForUserWithBlogId = async (requestBody, blogId) => {
    const findBlog  = await Blog.findOne({_id : blogId});
    if(!findBlog)
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
     Object.assign(findBlog,requestBody) 
     await findBlog.save();
};

const getBlogForUserWithBlogId = async (blogId) => {
    const findBlog  = await Blog.findOne({_id : blogId});
    if(!findBlog)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog not found');
    const getCommentCountForBlog = await Comment.find({blogId}).countDocuments()
    const getLikeCountForBlog = await Like.find({blogId}).countDocuments()
    return {blog : findBlog , comment : getCommentCountForBlog , like : getLikeCountForBlog}
};

const getBlogForLoginUserWithUserId = async (requestBody, userId) => {
    const { paganation } = requestBody;
    const paganationData = {
        page : paganation ? paganation.page : 1,
        limit : paganation ? paganation.limit : 10
    }
    const blogCount  = await Blog.find({userId}).countDocuments();
    paganationData.totalPages = Math.ceil(blogCount/paganationData.limit)
    const skip = Math.floor((paganationData.page-1)*paganationData.limit)
    const blogs  = await Blog.find({userId}).skip(skip).limit(paganationData.limit);
    return { ... paganationData , blogCount ,blogs }
};

const getALlBlogForUser = async (requestBody) => {
    const { paganation } = requestBody;
    const paganationData = {
        page : paganation ? paganation.page : 1,
        limit : paganation ? paganation.limit : 10
    }
    const blogCount  = await Blog.find({}).countDocuments();
    paganationData.totalPages = Math.ceil(blogCount/paganationData.limit)
    const skip = Math.floor((paganationData.page-1)*paganationData.limit)
    const blogs  = await Blog.find({}).skip(skip).limit(paganationData.limit);
    return { ... paganationData , blogCount ,blogs }
};


const likeBlogWithBlogId = async (blogId, userId) => {
    const findLikedBlog = await Like.findOne({ blogId , userId });
    if(findLikedBlog)
    throw new ApiError(httpStatus.CONFLICT, 'You have already liked Blog');
    await Like.create({ blogId , userId });
    
};

const unlikeBlogWithBlogId = async (blogId, userId) => {
    const findLikedBlog = await Like.findOne({ blogId , userId });
    if(!findLikedBlog)
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not liked');
    await findLikedBlog.remove()
};
const saveBlogWithBlogId = async (blogId, userId) => {
    const findSavedBlog = await SaveBlog.findOne({ blogId , userId });
    if(findSavedBlog)
    throw new ApiError(httpStatus.CONFLICT, 'You have already saved Blog');
    await SaveBlog.create({ blogId , userId });
};

const unsaveBlogWithBlogId = async (blogId, userId) => {
    const findSavedBlog = await SaveBlog.findOne({ blogId , userId });
    if(!findSavedBlog)
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not saved');
    await findSavedBlog.remove()
};
module.exports={
    createBlogForUserWithUserId,
    deleteBlogForUserWithBlogId,
    editBlogForUserWithBlogId,
    getBlogForUserWithBlogId,
    getALlBlogForUser,
    getBlogForLoginUserWithUserId,
    likeBlogWithBlogId,
    unlikeBlogWithBlogId,
    saveBlogWithBlogId,
    unsaveBlogWithBlogId,
}
