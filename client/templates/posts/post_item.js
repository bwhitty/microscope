/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;

    return a.hostname;
  },

  submitted: function () {
    return this.submitted ? moment(this.submitted).fromNow() : '';
  }
});
