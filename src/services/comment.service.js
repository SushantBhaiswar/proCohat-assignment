/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const  mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { Blog, Comment, CommentReply  } = require("../models");
/**
 * Create user blog with userId
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const postCommentForBlogWithBlogId = async (requestBody, userId) => {
    const { blogId, comment } = requestBody
    const createdBlog = await Comment.create({ blogId, comment, userId });
    return createdBlog;
};

const editCommentForBlogWithCommentId = async (commentId ,requestBody) => {
    const { comment } = requestBody;
    const findComment = await Comment.findOne({ _id: commentId });
    if (!findComment)
        throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
    findComment.comment = comment
    await findComment.save()
    return findComment
};

const deleteCommentForBlogWithCommentId = async (commentId) => {
    const comment = await Blog.findOne({ _id: commentId });
    if (!comment)
        throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
     comment.remove();
     await CommentReply.deleteMany(commentId)
    
};

const getCommentsForBlogWithBlogId = async (blogId ,requestBody) => {
 const {paganation} = requestBody
    const paganationData = {
        page : paganation ? paganation.page : 1,
        limit : paganation ? paganation.limit : 10
    }
    const skip = Math.floor((paganationData.page-1)*paganationData.limit)
   
    const pipeline = [
        {
            $match:{
                blogId : mongoose.Types.ObjectId(blogId)
            }
        },
        {
            $lookup:{
                from : 'users',
                localField : 'userId',
                foreignField : '_id',
                as : 'user'
            }
        },
        {
            $unwind:{
                path : '$user',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $project : {
                comment : 1,
                user : {
                    _id : 1 ,
                    name : 1,
                }
            }
        },
        {
            $sort :{
                createdAt : -1
            }
        },
        {
           $skip : skip
        },
        {
            $limit : paganationData.limit
        }
       ]
    const commentCount = await Comment.find({blogId}).countDocuments();
    const comments = await Comment.aggregate(pipeline)
    paganationData.totalPages = Math.ceil(commentCount/paganationData.limit)

     return {...paganationData , commentCount , comments}
};

const getBlogForLoginUserWithUserId = async (requestBody, userId) => {
    const { paganation } = requestBody;
    const paganationData = {
        page: paganation ? paganation.page : 0,
        limit: paganation ? paganation.limit : 10
    }
    const blogCount = await Blog.find({ userId }).countDocuments();
    paganationData.totalPages = Math.ceil(blogCount / paganationData.limit)
    const skip = Math.floor((paganationData.page - 1) * paganationData.limit)
    const blogs = await Blog.find({ userId }).skip(skip).limit(paganationData.limit);
    return { ...paganationData, blogCount, blogs }
};

const getALlBlogForUser = async (requestBody) => {
    const { paganation } = requestBody;
    const paganationData = {
        page: paganation ? paganation.page : 0,
        limit: paganation ? paganation.limit : 10
    }
    const blogCount = await Blog.find({}).countDocuments();
    paganationData.totalPages = Math.ceil(blogCount / paganationData.limit)
    const skip = Math.floor((paganationData.page - 1) * paganationData.limit)
    const blogs = await Blog.find({}).skip(skip).limit(paganationData.limit);
    return { ...paganationData, blogCount, blogs }
};

module.exports = {
    postCommentForBlogWithBlogId,
    editCommentForBlogWithCommentId,
    deleteCommentForBlogWithCommentId,
    getCommentsForBlogWithBlogId,
    getALlBlogForUser,
    getBlogForLoginUserWithUserId,
}
