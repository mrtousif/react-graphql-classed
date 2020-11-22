const { gql } = require("apollo-server");
// const {} = require("graphql-scalars");
// The GraphQL schema
const typeDefs = gql`
    scalar DateTime
    scalar EmailAddress

    enum UserOrID {
        User
        ID
    }

    type Post {
        _id: ID!
        body: String!
        user: User
        createdAt: DateTime!
        comments: Int!
        likes: Int!
    }

    type NewPost {
        _id: ID!
        body: String!
        user: ID!
        postId: ID
        createdAt: String!
    }

    type Comment {
        _id: ID!
        body: String!
        postId: ID
        user: User
        likes: Int
        replies: Int
        createdAt: String!
    }

    type NewComment {
        _id: ID!
        body: String!
        user: ID!
        createdAt: String!
    }

    type Like {
        _id: ID!
        user: ID
        userName: String
        createdAt: String!
    }

    type User {
        _id: ID!
        name: String!
        photo: String!
    }

    type Profile {
        user: User!
        comments: [Comment]!
        likedComments: [Comment]!
        likeCount: Int
        commentCount: Int
    }

    type AuthUser {
        _id: ID!
        name: String!
        email: EmailAddress!
        token: String!
        photo: String!
        createdAt: String
    }

    input RegisterInput {
        name: String!
        email: EmailAddress!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post!
        getComments(postId: ID!): [Comment]!
        getProfile(userId: ID!): Profile!
    }

    type Mutation {
        register(
            name: String!
            email: EmailAddress!
            password: String!
            confirmPassword: String!
        ): AuthUser!

        login(email: EmailAddress!, password: String!): AuthUser!

        createPost(body: String!): NewPost!
        deletePost(postId: ID!): String
        updatePost(postId: ID!, body: String): Post!
        likePost(postId: ID!): Post

        createComment(postId: ID!, body: String!): NewComment!
        deleteComment(commentId: ID!): String
        updateComment(commentId: ID!, body: String!): Comment!
        likeComment(commentId: ID!): Comment
    }

    type Subscription {
        newPost: NewPost!
    }
`;

module.exports = typeDefs;
