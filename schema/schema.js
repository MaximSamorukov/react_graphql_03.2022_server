const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;
const _ = require('lodash');

const users = [
  {
    id: '1',
    firstName: 'Mike',
    secondName: 'Slacke',
    occupation: 'engineer',
    age: 23,
    city: 'Moscow',
    country: 'Russia',
    posts: 'posts',
  },
  {
    id: '2',
    firstName: 'Sike',
    secondName: 'Placke',
    occupation: 'engineer',
    age: 28,
    city: 'Novgorod',
    country: 'Russia',
    posts: 'posts',
  },
  {
    id: '3',
    firstName: 'Tike',
    secondName: 'Klacke',
    occupation: 'engineer',
    age: 45,
    city: 'Voronezj',
    country: 'Russia',
    posts: 'posts',
  },
];

const posts = [
  {
    id: '1',
    title: 'Title 1',
    description: 'description 1',
    content: 'Content 1',
    date: '11-11-2011',
    userId: '1',
    city: 'Moscow',
    country: 'Russia',
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'description 2',
    content: 'Content 2',
    date: '11-11-2011',
    userId: '1',
    city: 'Novgorod',
    country: 'Russia',
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'description 3',
    content: 'Content 3',
    date: '11-11-2011',
    userId: '3',
    city: 'Voronezj',
    country: 'Russia',
  },
];

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    secondName: {
      type: GraphQLString
    },
    occupation: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    city: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    posts: {
      type: GraphQLString
    },
  }
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id });
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(posts, { id: args.id });
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});