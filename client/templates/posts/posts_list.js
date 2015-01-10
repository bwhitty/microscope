/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
});
