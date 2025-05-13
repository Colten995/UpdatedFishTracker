import { Component} from '@angular/core';
import {FishManagerService, Fish} from '../fish-manager.service';
import { AlertController, IonicSafeString } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {

  constructor(public fishManager : FishManagerService, 
    private alertController:AlertController) {}

    public async presentFishInformation(fishToPresent:Fish) {
      //Debug message -- remove later
        //     alert(`Species : ${fishToPresent.species}, Name: ${fishToPresent.name}, Weight: ${fishToPresent.weight},
        //  Length: ${fishToPresent.length}, Latitude: ${fishToPresent.latitude}, Longitude: ${fishToPresent.longitude},
        //   Date Caught: ${fishToPresent.date}`);
      const fishInformationAlert = await this.alertController.create(
        {
          /*TODO figure out how to add new lines in an alert controller message. May require switching to a modal or newer alert
          https://stackoverflow.com/questions/61129651/html-tags-are-not-working-in-ionic-5-alert-text/61130342#61130342 
          How do I enable innerHtmlTemplates? https://github.com/ionic-team/ionic-framework/issues/27118#issuecomment-1497470528 
          Setting InnerHtmlTemplatesEnabled to true in ionic.config.json is supposed to fix this, but doesn't: 
          https://www.google.com/search?q=how+do+i+change+ionic+config&rlz=1C1VDKB_enCA1091CA1091&oq=how+do+i+change+ionic+config&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCAgCEAAYFhgeMg0IAxAAGIYDGIAEGIoFMgoIBBAAGIAEGKIE0gEINjE1MWowajSoAgCwAgE&sourceid=chrome&ie=UTF-8
          https://ionicframework.com/docs/developing/config#reading-the-config-angular */
          message:
          'Name: ' + fishToPresent.name + '<br/>' +
          'Species: ' + fishToPresent.species + '<br/>' +
          'Weight: ' + fishToPresent.weight + this.fishManager.weightUnit + '<br/>' +
          'Length: ' + fishToPresent.length + this.fishManager.measurementSystem + '<br/>' +
          'Latitude: ' + fishToPresent.latitude + '<br/>' +
          'Longitude: ' + fishToPresent.longitude + '<br/>' +
          'Date Caught: ' + fishToPresent.date,
          buttons: ['OK']
        }
      );
      fishInformationAlert.present();
    }   
}
