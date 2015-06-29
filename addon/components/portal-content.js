import Ember from 'ember';
import portalIdForName from '../utils/portal-id';

export default Ember.Component.extend({

  portalService: Ember.inject.service("portal"),

  for: "default",

  items: Ember.computed("for", {
    get() {
      return this.get("portalService").itemsFor(this.get("for"));
    }
  }),

  wormholeName: Ember.computed("for", {
    get() {
      return portalIdForName(this.get("for"));
    }
  }),

  showingPortalItem: Ember.computed("items.length", {
    get() {
      return this.get("items.lastObject") === this;
    }
  }),

  setupPortalAndRegister: Ember.on("didInsertElement", function() {
    this.setupWormholeElement();
    this.get("portalService").addPortalContent(this.get("for"), this);
  }),

  setupWormholeElement() {
    const id = this.get("wormholeName");
    if (document.getElementById(id)) {
      return;
    }

    const rootEl       = document.body;
    const stackElement = document.createElement('div');
    stackElement.id    = id;
    stackElement.style.display = 'none';

    rootEl.appendChild(stackElement);
  },

  teardown: Ember.on("willDestroyElement", function() {
    this.get("portalService").removePortalContent(this.get("for"), this);
  })
});