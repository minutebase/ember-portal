import Ember from 'ember';
import portalIdForName from '../utils/portal-id';

const PORTAL_ITEMS = {};
const ADDED_QUEUE  = Ember.A();

export default Ember.Component.extend({

  for: "default",
  _items: null,

  wormholeName: Ember.computed("for", {
    get() {
      return portalIdForName(this.get("for"));
    }
  }),

  showingPortalItem: Ember.computed("_items.length", {
    get() {
      return this.get("_items.lastObject") === this;
    }
  }),

  setupPortalAndRegister: Ember.on("didInsertElement", function() {
    const name  = this.get("for");
    const items = PORTAL_ITEMS[name] = PORTAL_ITEMS[name] || Ember.A();

    setupWormholeElement(this.get("wormholeName"));

    ADDED_QUEUE.push(this);

    Ember.run.scheduleOnce("afterRender", null, handleItemsAdded);

    this.set("_items", items);
  }),

  teardown: Ember.on("willDestroyElement", function() {
    this.get("_items").removeObject(this);
  })
});

function handleItemsAdded() {
  ADDED_QUEUE.reverse().forEach(item => {
    item.get("_items").pushObject(item);
  });
  ADDED_QUEUE.clear();
}

function setupWormholeElement(id) {
  if (document.getElementById(id)) {
    return;
  }

  const rootEl       = document.body;
  const stackElement = document.createElement('div');
  stackElement.id    = id;
  stackElement.style.display = 'none';

  rootEl.appendChild(stackElement);
}