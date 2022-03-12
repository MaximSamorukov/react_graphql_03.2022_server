const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String },
  description: { type: String },
  date: { type: String },
  content: { type: String },
  city: { type: String },
  country: { type: String },
  userId: { type: String },
  //user: [{
  //  type: Schema.Types.ObjectId,
  //  ref: 'user'
  //}]
});

mongoose.model('post', PostSchema);