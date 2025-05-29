import { Component } from '@angular/core';
import {FishManagerService, Fish} from '../fish-manager.service';
import {AlertController} from '@ionic/angular';
import {Camera, CameraResultType, CameraSource, ImageOptions, Photo} from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem, Directory} from '@capacitor/filesystem';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  //Declares the component as an old ngmodule instead of a standalone component https://v17.angular.io/guide/standalone-components 
  standalone: false
})
export class Tab1Page {
//  todayISO: string = new Date().toISOString();

  /*The model for each fish caught includes:
    Species : the species of the fish ex: Bass
    Weight : The measured weight of the fish
    Length : The measured length of the fish
    Latitude : The latitude of the device when the fish was caught
    Longitude : The longitude of the device when the fish was caught
    Image : The path of the image taken of the fish
    Date : The current date
    Name : A name for the fish
  */
    
    //TODO: create function to initialize an empty fish, is this possible? Fish is an interface
  public fishToAdd: Fish = {
    species:"",
    weight: 0,
    length: 0,
    latitude: 0,
    longitude: 0,
    image:"",
    date: "",
    name: ""
  };

  /*It's required to initialize all of these classes in the ctor to use them. Angular determines which dependencies this component needs
  by looking at the constructor of the component */
  
  constructor(public fishManager: FishManagerService, 
    private alertController: AlertController,) {
      console.log(this.fishToAdd);
      
      console.log(new Date().toISOString());
      }

      //**Make sure to enable location permissions in android and ios when you set them up 
      // https://ionicframework.com/docs/native/geolocation#getcurrentposition  */
   public async getFishingSpot()
    {
      let options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
      }
      //use an async call to get the current position with the GeoLocation plugin

      //call the get current position function to retrieve the location information
      //then once the information is retrieved set the latitude and longitude of the current fish
      Geolocation.getCurrentPosition().then((response) => {
        this.fishToAdd.latitude = response.coords.latitude;
        this.fishToAdd.longitude = response.coords.longitude;
        //Display an error alert box if the current position can't be retrieved
       }).catch( async (error) => {
         const errorAlert = await this.alertController.create({
           message : 'Error getting location' + error,
           buttons: ['OK']
         });
         errorAlert.present();
       });
    }
    
   public async takePicture()
    {

      const options: ImageOptions = {
        quality: 100,
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source: CameraSource.Camera
      };

      // const photo = await Camera.getPhoto(options);
      //without the "!" the compiler thinks this is undefined, but it is not , The "!" is very important!!!
      // this.fishToAdd.image = photo.webPath!

      //Have to include this somehow
    //   .then((imageData) => {
    // }, async (err) => {
    //   const errorAlert = await this.alertController.create({
    //     message : 'Error getting photo' + err,
    //     buttons: ['OK']
    //   });
    //   errorAlert.present();
    // });
    const capturedPhoto = await Camera.getPhoto(options);

    this.fishToAdd.image = (await this.savePicture(capturedPhoto)).filepath;
  }

  private async savePicture(photo: Photo)
  {
    const base64Data = await this.readAsBase64(photo);
    const fileName = Date.now() + '.jpeg';

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    //fetch() makes a request to the server to get the image and returns a promise that resolves to the response to the request
    const response = await fetch(photo.webPath!);
    //blob() returns the blob representation of the response body
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async validateAndSubmitForm(form: HTMLFormElement) {
    let successAlert;
    if (form.reportValidity()) {
      this.fishManager.addToCollection(this.fishToAdd);
      //Debug message -- remove later
      alert(`Species : ${this.fishToAdd.species}, Name: ${this.fishToAdd.name}, Weight: ${this.fishToAdd.weight},
         Length: ${this.fishToAdd.length}, Latitude: ${this.fishToAdd.latitude}, Longitude: ${this.fishToAdd.longitude},
          Date Caught: ${this.fishToAdd.date}`);
      //call function to initialize new empty fish
        this.fishToAdd = {
          species:"",
          weight: 0,
          length: 0,
          latitude:0,
          longitude:0,
          image:"",
          date: "",
          name: ""
        };
        successAlert = await this.alertController.create({
          message: 'Fish succesfully added to collection',
          buttons: ['OK']
        });
        successAlert.present();
      }
  }
}
