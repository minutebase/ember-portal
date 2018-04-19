import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    clicked() {
      window.alert("clicked");
    }
  }
});
