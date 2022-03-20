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
const { PostType, UserType } = require('./types');
const User = mongoose.model('user');
const Post = mongoose.model('post');

const user = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  resolve(parentValue, { id }) {
    return User.findById(id).then((item) => item)
  }
};

const users = {
  type: new GraphQLList(UserType),
  resolve() {
    return User.find({}).then((items) => items)
  }
};

const post = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve(parentValue, { id }) {
    return Post.findById(id).then((item) => item)
  }
};

const posts = {
  type: new GraphQLList(PostType),
  resolve() {
    return Post.find({}).then((items) => items)
  }
};

module.exports = {
  user,
  users,
  post,
  posts,
}