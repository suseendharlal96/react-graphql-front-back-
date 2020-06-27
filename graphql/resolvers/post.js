const { AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        console.log(
          "post",
          typeof post._id
          // ObjectId.toString(post._id).length
        );
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        userId: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      console.log(post);
      return post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username.trim() === post.username.trim()) {
          await post.deleteOne();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError(
            "Unauthorized to perform the operation"
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
