import Ember from 'ember';

const ADDED_QUEUE = Ember.A();

export default Ember.Service.extend({
  portals: null,

  setupPortals: Ember.on("init", function() {
    this.set("portals", {});
  }),

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
    if (this.addToQueueInReverse()) {
      ADDED_QUEUE.unshift({ name, component });
    } else {
      ADDED_QUEUE.push({ name, component });
    }

    // run after render to avoid warning that items were modified on didInsertElement hook
    Ember.run.scheduleOnce("afterRender", this, this.flushPortalContent);
  },

  flushPortalContent() {
    ADDED_QUEUE.forEach(({name, component}) => {
      this.itemsFor(name).pushObject(component);
    });

    ADDED_QUEUE.clear();
  },

  removePortalContent(name, component) {
    this.itemsFor(name).removeObject(component);
  },

  // prior to 1.13.x components are inserted in reverse order
  addToQueueInReverse() {
    const [maj, min] = Ember.VERSION.split('.').map(i => parseInt(i, null));
    return maj === 1 && min < 13;
  }
});