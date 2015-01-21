/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

PostHelper = {
  /**
   * Validate a post
   *
   * @param {{}} post
   * @returns {{}}
   */
  validate: function (post) {
    var errors = {};
    if (!post.title) {
      errors.title = 'Please fill in a headline';
    }
    if (!post.url) {
      errors.url = 'Please fill in a URL';
    }

    return errors;
  }
};


