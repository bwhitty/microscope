/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.commentItem.helpers({
  submittedText: function () {
    return this.submitted.toString();
  }
});
