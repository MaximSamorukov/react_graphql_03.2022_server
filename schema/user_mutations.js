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
    const newUser = { firstName, secondName, occupation, age, city, country };
    return new User(newUser).save();
  }
};

const addPostToUser = {
  type: UserType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(__, { title, description, content, date, city, country, userId }) {
    return User.addPostToUser({ title, description, content, date, city, country, id: userId })
  }
};

const deletePostFromUser = {
  type: UserType,
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(__, { postId, userId }) {
    return User.deletePostFromUser({ postId, userId })
  }
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(__, { id }) {
    const user = await User.deleteUser(id);
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
    await User.updateUser(id, args);
    const user = await User.findById(id);
    return user;
  }
};

module.exports = {
  addUser,
  addPostToUser,
  deletePostFromUser,
  deleteUser,
  updateUser,
}