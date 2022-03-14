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

const addPost = {
  type: PostType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(__, { title, description, content, date, city, country, userId }) {
    const newPost = { title, description, content, date, city, country, userId };
    return new Post(newPost).save();
  }
};

const deletePost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(__, { id }) {
    const post = await Post.deletePost(id);
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
    userId: { type: GraphQLID }
  },
  async resolve(__, { id, ...args }) {
    await Post.updatePost(id, args);
    const post = await Post.findById(id);
    return post;
  }
};

module.exports = {
  addPost,
  deletePost,
  updatePost,
}