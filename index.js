const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDef = require("./graphql/TypeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const server = new ApolloServer({ typeDefs: typeDef, resolvers });

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`running ${res}-${res.url}`);
  });
