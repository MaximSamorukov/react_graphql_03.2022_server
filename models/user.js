const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String },
  secondName: { type: String },
  occupation: { type: String },
  age: { type: Number },
  city: { type: String },
  country: { type: String },
  created: { type: Date },
  posts: [{ type: String }]
});

UserSchema.statics.addUser = function({ firstName, secondName, occupation, age, city, country }) {
  const User = mongoose.model('user');
  return User.save({ firstName, secondName, occupation, age, city, country })
    .then(user => {
      return user
    });
}

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
