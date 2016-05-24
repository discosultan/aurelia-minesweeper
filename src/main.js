var Promise = require('bluebird'); // Promise polyfill for IE11

import { bootstrap } from 'aurelia-bootstrapper-webpack';

bootstrap(aurelia => {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .eventAggregator()
    .plugin('aurelia-animator-css');

  aurelia.start().then(() => aurelia.setRoot('app', document.body));
});
