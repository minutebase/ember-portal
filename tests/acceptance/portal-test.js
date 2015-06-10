import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | portal', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#examples-header").length, 1, 'Shows the example header');
    assert.equal(find("#examples-footer").length, 1, 'Shows the example footer');
  });
});

test('visiting /foo', function(assert) {
  visit('/foo');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#foo-header").length, 1, 'Shows the foo header');
    assert.equal(find("#examples-footer").length, 1, 'Shows the example footer');
  });
});


test('visiting /bar', function(assert) {
  visit('/bar');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#examples-header").length, 1, 'Shows the example header');
    assert.equal(find("#bar-footer").length, 1, 'Shows the bar footer');
  });
});

test('visiting /bar/baz', function(assert) {
  visit('/bar/baz');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#baz-header").length, 1, 'Shows the baz header');
    assert.equal(find("#baz-footer").length, 1, 'Shows the baz footer');
  });
});


test('can give portals classes', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find("#ember-portal--header.header-portal").length, 1, 'header has a custom class');
    assert.equal(find("#ember-portal--footer.footer-portal").length, 1, 'footer has a custom class');
  });
});