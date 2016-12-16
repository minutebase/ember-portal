import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp() {
  let application;

  Ember.run(() => {
    application = Application.create(config.APP);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
