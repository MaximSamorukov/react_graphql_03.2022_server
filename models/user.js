const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String },
  secondName: { type: String },
  occupation: { type: String },
  age: { type: Number },
  city: { type: String },
  country: { type: String },
  posts: [{ type: String }]
});

UserSchema.statics.addUser = function({ firstName, secondName, occupation, age, city, country }) {
  const User = mongoose.model('user');

  return User.save({ firstName, secondName, occupation, age, city, country })
    .then(user => {
      return user
    });
}

//UserSchema.statics.addPostToUser = function({ id, title, description, date, content, city, country }) {
//  const Post = mongoose.model('post');

//  return this.findById(id)
//    .then((user) => {
//      const post = new Post({title, description, date, content, city, country});
//      user.posts.push(post)
//      return Promise.all([user.save(), post.save()])
//        .then(([user, post]) => user);
//    })
//}

//UserSchema.statics.deletePostFromUser = function({ userId, postId }) {
//  const Post = mongoose.model('post');
//  return this.findById(userId)
//  .then((user) => {
//    console.log(user.posts)

//    return Promise.all([user.save(), post.save()])
//      .then(([user, post]) => user);
//  })
//}

UserSchema.statics.deleteUser = async function(userId) {
  const User = mongoose.model('user');
  const removedUser = await User.findByIdAndRemove(userId);
  return removedUser;
}

UserSchema.statics.updateUser = async function(id, update) {
  const User = mongoose.model('user');
  await User.findByIdAndUpdate(id, update);
}

UserSchema.statics.findPosts = function(id) {
  return this.findById(id)
    .populate('posts')
    .then(user => user.posts);
}
mongoose.model('user', UserSchema);

//UserSchema.statics.getUser = function(id) {
//  return this.findById(id)
//    .populate('lyrics')
//    .then(song => song.lyrics);
//}

//UserSchema.statics.deleteUser = function(id) {
//  return this.findById(id)
//    .populate('lyrics')
//    .then(song => song.lyrics);
//}

//UserSchema.statics.getUsers = function(id) {
//  return this.findById(id)
//    .populate('lyrics')
//    .then(song => song.lyrics);
//}
