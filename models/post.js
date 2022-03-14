const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String },
  description: { type: String },
  date: { type: String },
  content: { type: String },
  city: { type: String },
  country: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

PostSchema.statics.addPost = function({ title, description, content, date, city, country, userId }) {
  const Post = mongoose.model('post');
  return Post.save({ title, description, content, date, city, country, userId })
    .then(post => {
      return post;
    });
}

PostSchema.statics.deletePost = async function(postId) {
  const Post = mongoose.model('post');
  const removedPost = await Post.findByIdAndRemove(postId);
  return removedPost;
}

PostSchema.statics.updatePost = async function(id, update) {
  const Post = mongoose.model('post');
  await Post.findByIdAndUpdate(id, update);
}

mongoose.model('post', PostSchema);