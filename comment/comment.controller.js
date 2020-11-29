const Comment = require("./comment.model");
const Profile = require("../profile/profile.model");
const Post = require("../post/post.model");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/APIFeatures");
// const factory = require('./handlerFactory');

const { AuthenticationError, UserInputError } = require("apollo-server");

exports.createComment = async ({ postId, body, user }) => {
    //check if websiteid exists
    // get the user name
    const newComment = await Comment.create({
        body,
        postId,
        user: user._id,
    });
    // update user profile
    await Profile.findOneAndUpdate(
        { user: user._id },
        {
            $push: { comments: newComment._id },
        }
    );

    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

    // const updateProfile = await Profile.

    return newComment;
};

exports.likeComment = async ({ commentId, user }) => {
    let likedComment;
    // get user profile
    const profile = await Profile.findOne({ user: user._id });
    // get comment
    const comment = await this.getComment({ commentId });
    // check if post is already liked
    likedPost = profile.likedComments.filter(
        (comment) => `${comment}` === `${commentId}`
    );
    let updatedComment;
    // post is not liked
    if (likedPost.length === 0) {
        comment.likes = comment.likes + 1;
        updatedComment = await comment.save();

        profile.likedComments.push(commentId);

        await profile.save();
    } else {
        // post is already liked
        comment.likes = comment.likes - 1;
        updatedComment = await comment.save();

        const index = profile.likedComments.indexOf(commentId);
        if (index > -1) {
            profile.likedComments.splice(index, 1);
        }
        // updatedProfile = profile.likedPosts.filter((item) => item !== value);

        await profile.save();
    }
    return updatedComment;
};

exports.updateComment = async ({ commentId, body, user }) => {
    const comment = await Comment.findById(commentId);
    let updatedComment;
    if (comment && `${comment.user._id}` === `${user._id}`) {
        comment.body = body;
        updatedComment = await comment.save({
            validateBeforeSave: true,
        });
        // updatedcomment = await comment.findByIdAndUpdate(commentId, body, {
        //     new: true,
        //     // update does not run validators by default
        //     runValidators: true,
        // });
    } else if (!comment) {
        throw new UserInputError("Invalid ID. No document found");
    } else {
        throw new AuthenticationError("Action not allowed");
    }

    return updatedComment;
};

exports.deleteComment = async ({ commentId, user }) => {
    const doc = await Comment.findById(commentId);

    if (!doc) {
        throw new UserInputError("Invalid ID. No document found");
    }

    if (`${doc.user._id}` === `${user._id}`) {
        await Comment.findByIdAndDelete(commentId);
        await Profile.findOneAndUpdate(
            { user: user._id },
            {
                $pull: { comments: commentId },
            }
        );
        await Post.findByIdAndUpdate(postId, { $inc: { comment: -1 } });
    } else {
        throw new AuthenticationError("Action not allowed");
    }

    return null;
};

exports.getComment = async ({ commentId }) => {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new UserInputError("Invalid ID. Comment not found");
    }
    return comment;
};

exports.getAllComments = async ({ postId }) => {
    // to allow nested GET on tour(hack)
    let filter = {};
    if (postId) filter = { postId: postId };

    // TODO: Add a feature that sort by user comments if there's any
    // let token;
    // if (req.cookies.jwt) token = req.cookies.jwt;

    // building the query
    // const tours = await Tour.find()
    //     .where('duration')
    //     .equals(5)
    //     .where('difficulty')
    //     .equals('easy');
    let query = {};

    const features = new APIFeatures(Comment.find(filter), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // execute query
    const docs = await features.query;
    // const docs = await features.query.explain();
    // docs.map((comment) => {
    //     const photo = comment.userPhoto;
    //     comment.userPhoto = `https://f000.backblazeb2.com/file/user-profile-pics/${photo}`;
    // });
    // const docs = await Comment.find();

    // send response
    return docs;
};
