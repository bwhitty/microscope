/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

Router.configure({

  // Template used as the main layout container.
  layoutTemplate: 'layout',

  // Template used when loading transitions are happening.
  loadingTemplate: 'loading',

  // Template used for routes which 404.
  notFoundTemplate: 'notFound',

  // Function to tell Iron Router to wait to display the page until it is finished.
  waitOn: function () {
    return Meteor.subscribe('posts');
  }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function () {
    return Posts.findOne(this.params._id);
  },
  waitOn: function () {
    return Meteor.subscribe('comments', this.params._id);
  }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function () {
    return Posts.findOne(this.params._id);
  }
});

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function () {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

// Tells Iron Router to render the notFoundTemplate for the postPage route if it contains bad data.
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
// Register hook to secure postSubmit route
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
