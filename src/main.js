import '../style/foundation.css';
import '../style/style.css';

import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use    
    .standardConfiguration()
    // .developmentLogging()
    .plugin('aurelia-animator-css');

  await aurelia.start();
  aurelia.setRoot('app');
}