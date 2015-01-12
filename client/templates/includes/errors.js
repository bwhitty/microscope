/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.errors.helpers({
  errors: function () {
    return Errors.find();
  }
});
