import { Injectable } from '@angular/core';
// import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

//This is the key that will have the settings values
const SETTINGSKEY: string = 'settings';
//The key for the fish
const FISHKEY : string = 'fishes';

@Injectable({
  providedIn: 'root'
})
//The Fish Manager Service holds the settings for the app and uses the storage plugin to keep track of all the fish caught
export class FishManagerService {
  
  //Members
  clearDbOnStartup: boolean = false;
  weightUnit: string = 'lbs';
  measurementSystem = 'in';
  fishes: Array<Fish> = [];

  // private storage: Storage,
    // private alertController : AlertController
  constructor() 
  {
    // this.initialize();
  }

  //Initialize the fish manager
  // public async initialize()
  // {
  //   //Get the settings from the db and assign it to the setting object
  //  const settings = await this.storage.get(SETTINGSKEY);
  //  let savedFishes = await this.storage.get(FISHKEY);

  //  //Make sure settings is not null
  //  if (settings)
  //  {
  //     this.clearDbOnStartup = settings.clearDbOnStartup;
  //     this.weightUnit = settings.weightUnit;
  //     this.measurementSystem = settings.measurementSystem;
  //     if (this.clearDbOnStartup)
  //     {
  //      this.clearDatabase();
  //      savedFishes = [];
  //     }
  //  }
  //  if (savedFishes)
  //  {
  //    this.fishes = savedFishes;
  //  }

  // }

  //Saves the new settings to the db
  // public async saveSettings()
  // {
  //   const savedAlert = await this.alertController.create(
  //     {
  //       message: 'Settings saved',
  //       buttons:['OK']
  //     }
  //   )
  //   //Make a new object for the new settings
  //   const newSettings =
  //   {
  //     clearDbOnStartup : this.clearDbOnStartup,
  //     weightUnit : this.weightUnit,
  //     measurementSystem : this.measurementSystem
  //   }
  //   this.storage.set(SETTINGSKEY, newSettings);
  //   savedAlert.present();
  // }

  /*
    Clears the database and logs the fish that were cleared
  */
  // public async clearDatabase()
  // {
  //   const clearAlert = await this.alertController.create(
  //     {
  //       message: 'Collection cleared',
  //       buttons:['OK']
  //     }
  //   )
  //   this.storage.remove(FISHKEY);
  //   this.fishes = [];
  //   clearAlert.present();
  // }

  public addToCollection(fishToAdd: Fish)
  {
        this.fishes.push(fishToAdd);
        // this.storage.set(FISHKEY, this.fishes);
  }

}

//The interface to use when creating fish objects and storing them in the database
export interface Fish{
  species : string,
  weight : number,
  length : number,
  latitude : any,
  longitude : any,
  image: string,
  date : string,
  name? : string
}
