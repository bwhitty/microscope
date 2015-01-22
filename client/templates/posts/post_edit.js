/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Template.postEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = PostHelper.validate(postProperties);
    if (errors.url || errors.title) {
      return Session.set('postEditErrors', errors);
    }

    Posts.update(currentPostId, {$set: postProperties}, function (err) {
      if (err) {
        throwError(err.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    });
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm('Delete this post?')) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});

Template.postEdit.created = function () {
  Session.set('postEditErrors', {});
};

Template.postEdit.helpers({

  /**
   * Returns an error message for a given field.
   *
   * @param {string} field
   * @returns {string}
   */
  errorMessage: function (field) {
    return Session.get('postEditErrors')[field];
  },

  /**
   * Returns an error class if an error exists for a given field.
   *
   * @param {string} field
   * @returns {string}
   */
  errorClass: function (field) {
    return Session.get('postEditErrors')[field] ? 'has-error' : '';
  }
});
