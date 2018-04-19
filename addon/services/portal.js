import { A } from '@ember/array';
import Service from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const ADDED_QUEUE = A();
const REMOVED_QUEUE = A();

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
      items = A();
      portals[name] = items;
    }
    return items;
  },

  addPortalContent(name, component) {
    ADDED_QUEUE.push({ name, component });
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
