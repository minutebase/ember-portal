import { findAll, visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | portal', function(hooks) {
  hooks.beforeEach(function() {
    application = startApp();
  });

  hooks.afterEach(function() {
    run(application, 'destroy');
  });

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(findAll(".header").length, 1, 'Has 1 header');
    assert.equal(findAll(".footer").length, 1, 'Has 1 footer');

    assert.equal(findAll("#examples-header").length, 1, 'Shows the example header');
    assert.equal(findAll("#examples-footer").length, 1, 'Shows the example footer');
  });

  test('visiting /foo', async function(assert) {
    await visit('/foo');

    assert.equal(findAll(".header").length, 1, 'Has 1 header');
    assert.equal(findAll(".footer").length, 1, 'Has 1 footer');

    assert.equal(findAll("#foo-header").length, 1, 'Shows the foo header');
    assert.equal(findAll("#examples-footer").length, 1, 'Shows the example footer');
  });


  test('visiting /bar', async function(assert) {
    await visit('/bar');

    assert.equal(findAll(".header").length, 1, 'Has 1 header');
    assert.equal(findAll(".footer").length, 1, 'Has 1 footer');

    assert.equal(findAll("#examples-header").length, 1, 'Shows the example header');
    assert.equal(findAll("#bar-footer").length, 1, 'Shows the bar footer');
  });

  test('visiting /bar/baz', async function(assert) {
    await visit('/bar/baz');

    assert.equal(findAll(".header").length, 1, 'Has 1 header');
    assert.equal(findAll(".footer").length, 1, 'Has 1 footer');

    assert.equal(findAll("#baz-header").length, 1, 'Shows the baz header');
    assert.equal(findAll("#baz-footer").length, 1, 'Shows the baz footer');
  });


  test('can give portals classes', async function(assert) {
    await visit('/');

    assert.equal(findAll("#ember-portal--header.header-portal").length, 1, 'header has a custom class');
    assert.equal(findAll("#ember-portal--footer.footer-portal").length, 1, 'footer has a custom class');
  });

});
