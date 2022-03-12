const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const models = require('./models');
const schema = require('./schema/schema');

const app = express();

const MONGO_URI = 'mongodb+srv://ralph123ralph123:passwordqwerty@cluster0.ee6kw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Listening on port 4000')
})

// Mongo
// username ralph123ralph123
// password passwordqwerty
// mongoURI = mongodb+srv://ralph123ralph123:passwordqwerty@cluster0.ee6kw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority