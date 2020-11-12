const postResolvers = require("./posts");
const userResolvers = require("./users");

// A map of functions which return data for the schema.
module.exports = {
    Query: {
        ...postResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
    },
};
