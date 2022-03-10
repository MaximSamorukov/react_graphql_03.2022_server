const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const _ = require('lodash');

let users = [
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

let posts = [
  {
    id: '1',
    title: 'Title 1',
    description: 'description 1',
    content: 'Content 1',
    date: '11-11-2011',
    city: 'Moscow',
    country: 'Russia',
    userId: '1',
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'description 2',
    content: 'Content 2',
    date: '11-11-2011',
    city: 'Novgorod',
    country: 'Russia',
    userId: '1',
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'description 3',
    content: 'Content 3',
    date: '11-11-2011',
    city: 'Voronezj',
    country: 'Russia',
    userId: '2',
  },
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return posts.filter((i) => i.userId === parentValue.id)
      }
    },
  })
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
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
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return users.find((i) => i.id === parentValue.userId)
       }
    },
    city: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
  })
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        secondName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve(parentValue, { id, firstName, secondName, age }) {
        const newUser = { id, firstName, secondName, age };
        users = [ ...users, newUser ];
        return newUser;
      }
    },
    deleteUser: {
      type: new GraphQLList(UserType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, { id }) {
        users = users.filter((i) => i.id !== id);
        return users;
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});