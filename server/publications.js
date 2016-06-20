Meteor.publish('posts', function(author) {
  return Posts.find({author: author});
});

Meteor.publish('post.detail', function(postId) {
  return Posts.find();
});
