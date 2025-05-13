import { Component} from '@angular/core';
import {FishManagerService, Fish} from '../fish-manager.service';
// import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {

    // private alertController:AlertController
  constructor(public fishManager : FishManagerService) {}

    public async presentFishInformation(fishToPresent:Fish) {
      //Debug message -- remove later
            alert(`Species : ${fishToPresent.species}, Name: ${fishToPresent.name}, Weight: ${fishToPresent.weight},
         Length: ${fishToPresent.length}, Latitude: ${fishToPresent.latitude}, Longitude: ${fishToPresent.longitude},
          Date Caught: ${fishToPresent.date}`);
      // const fishInformationAlert = await this.alertController.create(
      //   {
      //     message:
      //     'Name: ' + fishToPresent.name + '<br/>' +
      //     'Species: ' + fishToPresent.species + '<br/>' +
      //     'Weight: ' + fishToPresent.weight + this.fishManager.weightUnit + '<br/>' +
      //     'Length: ' + fishToPresent.length + this.fishManager.measurementSystem + '<br/>' +
      //     'Latitude: ' + fishToPresent.latitude + '<br/>' +
      //     'Longitude: ' + fishToPresent.longitude + '<br/>' +
      //     'Date Caught: ' + fishToPresent.date,
      //     buttons: ['OK']
      //   }
      // );
      // fishInformationAlert.present();
    }   
}
