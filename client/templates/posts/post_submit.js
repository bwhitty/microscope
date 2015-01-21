/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postSubmit.events({
  'submit form': function (e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = PostHelper.validate(post);
    if (errors.title || errors.url) {
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function (err, result) {
      // Display the error to the user and abort
      if (err) {
        return throwError(error.reason);
      }

      // Alert the user and show the duplicate entry
      if (result.postExists) {
        throwError('This link has already been posted.');
      }

      Router.go('postPage', {_id: result._id});
    })
  }
});

Template.postSubmit.created = function () {
  Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({

  /**
   * Returns an error message for a given field.
   *
   * @param {string} field
   * @returns {string}
   */
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  },

  /**
   * Returns an error class if an error exists for a given field.
   *
   * @param {string} field
   * @returns {string}
   */
  errorClass: function (field) {
    return Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});
