const PostCtrl = require("../../post/post.controller");
const UserCtrl = require("../../user/user.controller");
// const { AuthenticationError } = require("apollo-server");

module.exports = {
    Subscription: {},

    Query: {
        getPosts: async (_, args, ctx) => {
            try {
                const posts = await PostCtrl.getAllPosts(ctx);

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },

        getPost: async (_, args) => {
            try {
                const { postId } = args;
                const post = await PostCtrl.getPost({ postId });
                return post;
            } catch (error) {
                throw new Error(error);
            }
        },
    },

    Mutation: {
        createPost: async (_, args, context) => {
            try {
                const { body } = args;
                const user = await UserCtrl.protect(context);

                const post = await PostCtrl.createPost({ body, user });

                context.pubsub.publish("NEW_POST", {
                    newPost: post,
                });

                return post;
            } catch (error) {
                throw new Error(error);
            }
        },

        updatePost: async (_, args, context) => {
            try {
                const { body, postId } = args;
                const user = await UserCtrl.protect(context);

                const post = await PostCtrl.updatePost({ postId, body, user });
                return post;
            } catch (error) {
                throw new Error(error);
            }
        },

        deletePost: async (_, args, context) => {
            try {
                const { postId } = args;
                const user = await UserCtrl.protect(context);

                const posts = await PostCtrl.deletePost({ postId, user });

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },

        likePost: async (_, args, context) => {
            try {
                const { postId } = args;
                const user = await UserCtrl.protect(context);

                const posts = await PostCtrl.likePost({ postId, user });
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
    },

    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
        },
    },
};
