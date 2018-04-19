import Service from 'ember-service';
import { scheduleOnce } from 'ember-runloop';
import Ember from 'ember';

const ADDED_QUEUE = Ember.A();
const REMOVED_QUEUE = Ember.A();

export default Service.extend({
  portals: null,

  init() {
    this._super(...arguments);
    this.set("portals", {});
  },

  itemsFor(name) {
    const portals = this.get("portals");
    let items = portals[name];
    if (!items) {
      items = Ember.A();
      portals[name] = items;
    }
    return items;
  },

  addPortalContent(name, component) {
    scheduleOnce("afterRender", this, this.flushPortalContent);
  },

  // run after render to avoid warning that items were modified on didInsertElement hook
  flushPortalContent() {
    ADDED_QUEUE.forEach(({name, component}) => {
      this.itemsFor(name).pushObject(component);
    });
    ADDED_QUEUE.clear();

    REMOVED_QUEUE.forEach(({name, component}) => {
      this.itemsFor(name).removeObject(component);
    });
    REMOVED_QUEUE.clear();
  },

  removePortalContent(name, component) {
    REMOVED_QUEUE.push({name, component});
    scheduleOnce("afterRender", this, this.flushPortalContent);
  }
});
