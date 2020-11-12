const Post = require("../../models/Post");

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                console.log(posts);
                return posts;
            } catch (error) {
                throw new Error(err);
            }
        },
    },
    Mutation: {},
};
