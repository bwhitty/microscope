/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

ownsDocument = function (userId, doc) {
  return doc && doc.userId === userId;
};
