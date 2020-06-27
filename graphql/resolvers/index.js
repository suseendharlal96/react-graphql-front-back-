const postsResolver = require("./post");
const usersResolver = require("./user");

module.exports = {
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
  },
};
