const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
} = graphql;

const {
  addUser,
  addPostToUser,
  deletePostFromUser,
  deleteUser,
  updateUser,
} = require('./user_mutations');

const {
  addPost,
  deletePost,
  updatePost,
} = require('./post_mutations');

const {
  user, users, post, posts
} = require('./queries');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user,
    users,
    post,
    posts,
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser,
    addPostToUser,
    deletePostFromUser,
    deleteUser,
    updateUser,
    addPost,
    deletePost,
    updatePost,
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});