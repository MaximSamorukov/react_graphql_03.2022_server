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
  args: { id: { type: GraphQLID } },
  resolve(parentValue, { id }) {
    return User.findById(id).then((item) => item)
  }
};

const users = {
  type: new GraphQLList(UserType),
  args: {
    field: { type: GraphQLString },
    sortDirection: { type: GraphQLString }
  },
  resolve(_, args) {
    const { sortDirection, field } = args;
    return User.find({}).sort({ [field]: sortDirection }).then((items) => items)
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
  args: {
    field: { type: GraphQLString },
    sortDirection: { type: GraphQLString }
  },
  resolve(_, args) {
    const { sortDirection, field } = args;
    return Post.find({}).sort({ [field]: sortDirection }).then((items) => items)
  }
};

module.exports = {
  user,
  users,
  post,
  posts,
}