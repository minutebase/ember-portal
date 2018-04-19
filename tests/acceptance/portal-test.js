import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | portal', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.dom(".header").exists({ count: 1 }, 'Has 1 header');
    assert.dom(".footer").exists({ count: 1 }, 'Has 1 footer');

    assert.dom("#examples-header").exists({ count: 1 }, 'Shows the example header');
    assert.dom("#examples-footer").exists({ count: 1 }, 'Shows the example footer');
  });

  test('visiting /foo', async function(assert) {
    await visit('/foo');

    assert.dom(".header").exists({ count: 1 }, 'Has 1 header');
    assert.dom(".footer").exists({ count: 1 }, 'Has 1 footer');

    assert.dom("#foo-header").exists({ count: 1 }, 'Shows the foo header');
    assert.dom("#examples-footer").exists({ count: 1 }, 'Shows the example footer');
  });


  test('visiting /bar', async function(assert) {
    await visit('/bar');

    assert.dom(".header").exists({ count: 1 }, 'Has 1 header');
    assert.dom(".footer").exists({ count: 1 }, 'Has 1 footer');

    assert.dom("#examples-header").exists({ count: 1 }, 'Shows the example header');
    assert.dom("#bar-footer").exists({ count: 1 }, 'Shows the bar footer');
  });

  test('visiting /bar/baz', async function(assert) {
    await visit('/bar/baz');

    assert.dom(".header").exists({ count: 1 }, 'Has 1 header');
    assert.dom(".footer").exists({ count: 1 }, 'Has 1 footer');

    assert.dom("#baz-header").exists({ count: 1 }, 'Shows the baz header');
    assert.dom("#baz-footer").exists({ count: 1 }, 'Shows the baz footer');
  });


  test('can give portals classes', async function(assert) {
    await visit('/');

    assert.dom("#ember-portal--header.header-portal").exists({ count: 1 }, 'header has a custom class');
    assert.dom("#ember-portal--footer.footer-portal").exists({ count: 1 }, 'footer has a custom class');
  });

});
