/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Posts = new Mongo.Collection('posts',{
  transform: function (collection) {
    // Apply Post model to collection
    return new Post(collection);
  }
});

// Check if this user has permission to update or remove
Posts.allow({
  update: function (userId, post) {
    return ownsDocument(userId, post);
  },
  remove: function (userId, post) {
    return ownsDocument(userId, post);
  }
});

Posts.deny({
  update: function (userId, post, fieldNames) {
    // User may only edit the following fields
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  postInsert: function (postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = PostHelper.validate(postAttributes);
    if (errors.title || errors.url) {
      throw new Meteor.Error('invalid-post', "You must set a URL and a title for your post");
    }

    // Check if this post has already been posted
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});