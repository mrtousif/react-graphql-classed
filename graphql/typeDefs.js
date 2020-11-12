const { gql } = require("apollo-server");

// The GraphQL schema
const typeDefs = gql`
    type Post {
        _id: ID!
        body: String!
        userName: String
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        token: String!
        createdAt: String!
    }

    input RegisterInput {
        name: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query {
        getPosts: [Post]
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
    }
`;

module.exports = typeDefs;
