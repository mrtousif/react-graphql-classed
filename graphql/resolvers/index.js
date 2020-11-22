const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentsResolvers = require("./comments");
const { DateTimeResolver, EmailAddressResolver } = require("graphql-scalars");

// A map of functions which return data for the schema.
module.exports = {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,

    Profile: {
        likeCount: (parent) => {
            console.log(parent);
            return parent.likes.length;
        },

        commentCount: (parent) => {
            parent.comments.length;
        },
    },

    Query: {
        ...postResolvers.Query,
        ...commentsResolvers.Query,
    },

    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },

    Subscription: {
        ...postResolvers.Subscription,
    },
};
