const Post = require("./post.model");
const PostLike = require("./postLike.model");
const Profile = require("../profile/profile.model");
// const Website = require("../website/website.model");
const { ValidationError, UserInputError, AuthenticationError } = require("apollo-server");

// const APIFeatures = require("../utils/APIFeatures");
// const factory = require('./handlerFactory');

exports.createPost = async ({ body, user }) => {
    // const { opinion, pageUrl } = req.body;
    //check if websiteid exists
    // get the user name
    const newPost = await Post.create({
        body,
        user: user._id,
    });

    await newPost
        .populate({
            path: "user",
            select: "name photo",
        })
        .execPopulate();

    // update user profile
    await Profile.findOneAndUpdate(
        { userId: user._id },
        {
            $push: { posts: newPost._id },
        }
    );

    // const updateProfile = await Profile.

    return newPost;
};

exports.likePost = async ({ postId, user }) => {
    // let likedPost;
    // liked = true;
    // get user profile
    const likedPost = await PostLike.findOne({ userId: user._id, postId: postId });
    // const profile = await Profile.findOne({ userId: user._id });

    // get post
    const post = await this.getPost({ postId });
    // check if post is already liked
    // likedPost = profile.likedPosts.filter((post) => `${post}` === `${postId}`);

    let updatedPost;
    // post is not liked
    if (!likedPost) {
        // profile.likedPosts.push(postId);
        await PostLike.create({ userId: user._id, postId: postId });

        post.likes = post.likes + 1;
        updatedPost = await post.save();
        // await profile.save();
    } else {
        // post is already liked
        await PostLike.deleteOne({ userId: user._id, postId: postId });

        post.likes = post.likes - 1;
        updatedPost = await post.save();

        // const index = profile.likedPosts.indexOf(postId);
        // if (index > -1) {
        //     profile.likedPosts.splice(index, 1);
        // }
        // // updatedProfile = profile.likedPosts.filter((item) => item !== value);

        // await profile.save();
    }
    return updatedPost;
};

exports.updatePost = async ({ postId, body, user }) => {
    const post = await Post.findById(postId);
    let updatedPost;
    if (post && `${post.user._id}` === `${user._id}`) {
        post.body = body;
        updatedPost = await post.save({
            validateBeforeSave: true,
        });
        // updatedPost = await Post.findByIdAndUpdate(postId, body, {
        //     new: true,
        //     // update does not run validators by default
        //     runValidators: true,
        // });
    } else if (!post) {
        throw new UserInputError("Invalid ID. No document found");
    } else {
        throw new AuthenticationError("Action not allowed");
    }

    return updatedPost;
};

exports.deletePost = async ({ postId, user }) => {
    const doc = await Post.findById(postId);
    if (!doc) {
        throw new UserInputError("Invalid ID. No document found", 404);
    }

    if (`${doc.user._id}` === `${user._id}`) {
        await Post.findByIdAndDelete(postId);
        await PostLike.deleteMany({ postId: postId });
        await Profile.findOneAndUpdate(
            { userId: user._id },
            {
                $pull: { posts: postId },
            }
        );
    } else {
        throw new UserInputError("Action not allowed");
    }

    return null;
};

exports.getPost = async ({ postId }) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new UserInputError("Invalid ID. Post not found");
    }

    return post;
};

exports.getAllPosts = async (ctx) => {
    // to allow nested GET on tour(hack)
    const { req } = ctx;
    // let filter = {};
    // if (req.params.pageUrl) filter = { pageUrl: req.params.pageUrl };

    // TODO: Add a feature that sort by user Posts if there's any
    // let token;
    // if (req.cookies.jwt) token = req.cookies.jwt;

    // building the query
    // const tours = await Tour.find()
    //     .where('duration')
    //     .equals(5)
    //     .where('difficulty')
    //     .equals('easy');

    // const features = new APIFeatures(Post.find(filter), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .paginate();

    // execute query
    // const docs = await features.query;
    // const docs = await features.query.explain();
    // docs.map((Post) => {
    //     const photo = Post.userPhoto;
    //     Post.userPhoto = `https://f000.backblazeb2.com/file/user-profile-pics/${photo}`;
    // });

    const docs = Post.find();

    // send response
    return docs;
};
