/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function (userId, doc) {
    // Only allow posting if a user is logged in
    return !! userId;
  }
});