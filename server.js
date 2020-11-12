const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception");
    console.error(err);
    console.error("Shutting Down the server...");
    // kill
    process.exit(1);
});

dotenv.config();

// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

const DB = process.env.LOCAL_DB;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        // console(con.connections);
        console.log("Database Connected");
    })
    .catch((err) => console.error("Database Connection Failure"));

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
