/**
 * Discover Meteor - Microscope Project
 *
 * @author Braden Whitten
 */

// Local-only collection
Errors = new Mongo.Collection(null);

throwError = function (message) {
  Errors.insert({message: message});
};
