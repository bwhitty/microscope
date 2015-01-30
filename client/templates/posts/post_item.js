/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postItem.helpers({
  ownPost: function () {
    return this.userId === Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;

    return a.hostname;
  },

  submitted: function () {
    return this.submitted ? moment(this.submitted).fromNow() : '';
  },

  commentsCount: function () {
    return Comments.find({postId: this._id}).count();
  }
});
