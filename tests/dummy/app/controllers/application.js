import Ember from 'ember';

export default Ember.Controller.extend({
  showingHeader: true,
  showingFooter: true,

  actions: {
    toggleHeader() {
      this.toggleProperty("showingHeader");
    },

    toggleFooter() {
      this.toggleProperty("showingFooter");
    }
  }
});