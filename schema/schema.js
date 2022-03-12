const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const _ = require('lodash');

const User = mongoose.model('user');
const Post = mongoose.model('post');
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
    userId: {
      type: GraphQLString
    },
    //user: {
    //  type: UserType,
    //  resolve(parentValue, args) {
    //    return users.find((i) => i.id === parentValue.userId)
    //   }
    //},
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
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({})
          .then((items) => {
            console.log(items);
            return items;
          })
      }
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return _.find(posts, { id: args.id });
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({})
          .then((items) => {
            console.log(items);
            return items;
          })
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
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        secondName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        occupation: {
          type: new GraphQLNonNull(GraphQLString)
        },
        city: {
          type: new GraphQLNonNull(GraphQLString)
        },
        country: {
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve(parentValue, { firstName, secondName, occupation, age, city, country }) {
        const newUser = { firstName, secondName, occupation, age, city, country };
        return User.create(newUser)
          .then((item) => {
            console.log(item);
            return item;
          })
      }
    },
    addPost: {
      type: PostType,
      args: {
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: new GraphQLNonNull(GraphQLString)
        },
        content: {
          type: new GraphQLNonNull(GraphQLString)
        },
        date: {
          type: new GraphQLNonNull(GraphQLString)
        },
        city: {
          type: GraphQLString
        },
        country: {
          type: GraphQLString
        },
        userId: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parentValue, { title, description, content, date, city, country, userId }) {
        const newPost = { title, description, content, date, city, country, userId };
        return Post.create(newPost)
          .then((item) => {
            console.log(item);
            return item;
          })
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