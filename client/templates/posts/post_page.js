/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postPage.helpers({
  comments: function () {
    return Comments.find({postId: this._id});
  }
});
