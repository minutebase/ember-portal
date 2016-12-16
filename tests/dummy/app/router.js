import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("example", { path: "/" }, function() {
    this.route("foo");
    this.route("bar", function() {
      this.route("baz");
    });
  });
});

export default Router;
