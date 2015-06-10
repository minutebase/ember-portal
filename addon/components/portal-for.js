import Ember from 'ember';
import portalIdForName from '../utils/portal-id';

export default Ember.Component.extend({
  name: 'default',

  'portal-class': null,

  portalElement() {
    const elementID = portalIdForName(this.get("name"));
    let element = document.getElementById(elementID);

    if (!element) {
      element = document.createElement('div');
      element.id = elementID;
    }

    return element;
  },

  movePortalIntoComponent: Ember.on("didInsertElement", function() {
    const portal = this.portalElement();
    portal.style.display = 'block';

    const portalClass = this.get("portal-class");
    if (portalClass && !portal.className) {
      portal.className = portalClass;
    }

    this.get("element").appendChild(portal);
  }),

  movePortalOutToBody: Ember.on("willDestroyElement", function() {
    const portal = this.portalElement();
    portal.style.display = 'none';
    document.body.appendChild(portal);
  })

});