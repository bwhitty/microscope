/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Meteor.publish('posts', function() {
  return Posts.find();
});
