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

const addUser = {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    secondName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    occupation: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(parentValue, { firstName, secondName, occupation, age, city, country }) {
    const newUser = { firstName, secondName, occupation, age, city, country, created: new Date() };
    return new User(newUser).save();
  }
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(__, { id }) {
    const user = await User.findByIdAndRemove(id);
    const { posts } = user;
    posts.map(async(id) => await Post.findByIdAndRemove(id))
    return user;
  }
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    secondName: { type: GraphQLString },
    age: { type: GraphQLInt },
    occupation: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    post: { type: new GraphQLList(GraphQLID) }
  },
  async resolve(__, { id, ...args }) {
    await User.findByIdAndUpdate(id, args);
    return User.findById(id);
  }
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
}