import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
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
