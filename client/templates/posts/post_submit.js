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

    Meteor.call('postInsert', post, function (err, result) {
      // Display the error to the user and abort
      if (err) {
        return alert(error.reason);
      }

      // Alert the user and show the duplicate entry
      if (result.postExists) {
        alert('This link has already been posted.');
      }

      Router.go('postPage', {_id: result._id});
    })
  }
});
