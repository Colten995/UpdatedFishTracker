import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// Required for camera plugin
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Call the element loader before the bootstrapModule/bootstrapApplication call

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  //also required for camera plugin
  defineCustomElements(window);
