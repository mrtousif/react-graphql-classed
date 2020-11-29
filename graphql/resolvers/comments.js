const postCtrl = require("../../post/post.controller");
const userCtrl = require("../../user/user.controller");
const commentCtrl = require("../../comment/comment.controller");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
    Query: {
        getComments: async (_, args, ctx) => {
            try {
                const { postId } = args;
                const comments = await commentCtrl.getAllComments({ postId });

                return comments;
            } catch (error) {
                throw new Error(error);
            }
        },

        // getComment: async (_, args) => {
        //     try {
        //         const { commentId } = args;
        //         const comment = await commentCtrl.getComment({ commentId });
        //         return comment;
        //     } catch (error) {
        //         throw new Error(error);
        //     }
        // },
    },
    Mutation: {
        createComment: async (_, args, context) => {
            try {
                const user = await userCtrl.protect(context);
                const { body, postId } = args;
                if (body.length < 1) {
                    throw new UserInputError("'body' must not be empty", {
                        errors: {
                            body: "Comment body must not be empty",
                        },
                    });
                }
                const post = await postCtrl.getPost({ postId });
                if (post) {
                    const comment = await commentCtrl.createComment({
                        postId,
                        body,
                        user,
                    });
                    return comment;
                } else {
                    throw new UserInputError("Invalid ID. Post not found");
                }
            } catch (error) {
                throw new Error(error);
            }
        },

        updateComment: async (_, args, context) => {
            try {
                const user = await userCtrl.protect(context);
                const { body, commentId } = args;
                if (body.length < 1) {
                    throw new UserInputError("'body' must not be empty", {
                        errors: {
                            body: "Comment body must not be empty",
                        },
                    });
                }

                const comment = await commentCtrl.createComment({
                    commentId,
                    body,
                    user,
                });
                return comment;
            } catch (error) {
                return new Error(error);
            }
        },

        deleteComment: async (_, args, context) => {
            try {
                const user = await userCtrl.protect(context);
                const { commentId } = args;
                const comment = await commentCtrl.deleteComment({
                    commentId,
                    user,
                });

                return comment;
            } catch (error) {
                throw new Error(error);
            }
        },

        likeComment: async (_, args, context) => {
            try {
                const user = await userCtrl.protect(context);
                const { commentId } = args;

                const comment = await commentCtrl.likeComment({
                    commentId,
                    user,
                });

                return comment;
            } catch (error) {
                throw new Error(error);
            }
        },
    },
};
