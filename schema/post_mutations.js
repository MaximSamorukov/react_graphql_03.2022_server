const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = graphql;
const { PostType } = require('./types');
const Post = mongoose.model('post');
const User = mongoose.model('user');

const addPost = {
  type: PostType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(__, { title, description, content, date, city, country, userId }) {
    const newPost = { title, description, content, date, city, country, user: userId, created: new Date() };
    const newPostFromDB = await new Post(newPost).save();
    const newPostFromDBID = newPostFromDB.id;
    const user = await User.findById(userId);
    const userPosts = user.posts;
    await User.findByIdAndUpdate(userId, { posts: [newPostFromDBID, ...userPosts]})
    return newPostFromDB;
  }
};

const deletePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(parentValue, { id }) {
    const post = await Post.findByIdAndDelete(id);
    const userId = post.user;
    const user = await User.findById(userId);
    const userPosts = user.posts;
    const filteredUserPosts = userPosts.filter((i) => i !== id);
    await User.findByIdAndUpdate(userId, { posts: filteredUserPosts })
    return post;
  }
};

const updatePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    user: { type: GraphQLString }
  },
  async resolve(__, { id, ...args }) {
    await Post.findByIdAndUpdate(id, args);
    return Post.findById(id);
  }
};

module.exports = {
  addPost,
  deletePost,
  updatePost,
}