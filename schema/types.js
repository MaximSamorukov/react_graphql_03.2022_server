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

const User = mongoose.model('user');
const Post = mongoose.model('post');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    secondName: { type: GraphQLString },
    occupation: { type: GraphQLString },
    age: { type: GraphQLInt },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue) {
        return Post.find({ user: parentValue.id })
      }
    },
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user)
      }
    },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
  })
});

module.exports = {
  PostType,
  UserType
}