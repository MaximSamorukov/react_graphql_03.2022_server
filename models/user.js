const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: { type: String },
  secondName: { type: String },
  occupation: { type: String },
  age: { type: Number },
  city: { type: String },
  country: { type: String },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
});
mongoose.model('user', UserSchema);

UserSchema.statics.addUser = function({ firstName, secondName, occupation, age, city, country }) {
  const User = mongoose.model('user');

  return User.save({ firstName, secondName, occupation, age, city, country })
    .then(user => {
      return user
    });
}

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
