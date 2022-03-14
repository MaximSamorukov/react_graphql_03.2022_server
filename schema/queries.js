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
  resolve(parentValue, args) {
    return User.findById(args.id)
      .then((item) => {
        return item;
      })
  }
};

const users = {
  type: new GraphQLList(UserType),
  resolve() {
    return User.find({})
      .then((items) => {
        console.log(items);
        return items;
      })
  }
};

const post = {
  type: PostType,
  args: { id: { type: GraphQLID } },
  resolve(parentValue, args) {
    return Post.find({ id: args.id })
      .then((item) => {
        return item;
      })
  }
};

const posts = {
  type: new GraphQLList(PostType),
  resolve() {
    return Post.find({})
      .then((items) => {
        return items;
      })
  }
};

module.exports = {
  user,
  users,
  post,
  posts,
}