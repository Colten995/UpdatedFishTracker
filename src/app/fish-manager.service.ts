import { Injectable } from '@angular/core';
import {Preferences} from '@capacitor/preferences';
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
    
  constructor(private alertController : AlertController) 
  {
    this.initialize();
  }

  /*This is one way to do this, but I found an easier way. This way is the only way to do it if we have
  to get multiple values from preferences*/
  /*The Preferences API get function always returns a GetResult which is a promise, so we have to get the inner string out of that 
  promise by putting the Preferences get call into a function that returns a promise which resolves as a string instead of type any
  The "Promise<string>" is a type annotation that declares what type the promise needs to resolve to*/
  private async getString(k: string): Promise<string> {
    const ret = await Preferences.get({ key: k });
    return (ret.value || '');
  }

  //Initialize the fish manager
  public async initialize()
  {
    /*Easiest way to get values from the Preferences storage */
    // const { value } = await Preferences.get({key: FISHKEY});
    // this.fishes = (value ? JSON.parse(value): []) as Fish[];
    // console.log(this.fishes);

  //Get fishes from the DB
  let savedFishes = await this.getString(FISHKEY);

   //Check if there are any fishes
   if (savedFishes)
   {
     this.fishes = JSON.parse(savedFishes);
     console.log(this.fishes);
   }

   let settingsString = await this.getString(SETTINGSKEY);

   //Make sure settings is not null
   if (settingsString)
   {
    //create a throwaway object to parse the string into
    const settings : Settings = JSON.parse(settingsString);
      this.clearDbOnStartup = settings.clearDbOnStartup;
      this.weightUnit = settings.weightUnit;
      this.measurementSystem = settings.measurementSystem;
      if (this.clearDbOnStartup)
      {
      //  this.clearDatabase();
       savedFishes = '';
      }
   }

  }




  // }

  // Saves the new settings to the db
  public async saveSettings()
  {
    const savedAlert = await this.alertController.create(
      {
        message: 'Settings saved',
        buttons:['OK']
      }
    )
    //Make a new object for the new settings
    const newSettings =
    {
      clearDbOnStartup : this.clearDbOnStartup,
      weightUnit : this.weightUnit,
      measurementSystem : this.measurementSystem
    }
    Preferences.set({key : SETTINGSKEY, value: JSON.stringify(newSettings)});
    savedAlert.present();
  }

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
        Preferences.set({key: FISHKEY,value: JSON.stringify(this.fishes)});
  }

}

//The interface to use when creating fish objects and storing them in the database
export interface Fish{
  species : string,
  weight : number,
  length : number,
  latitude : any,
  longitude : any,
  image: any,
  date : string,
  name? : string
}

export interface Settings{
  clearDbOnStartup: boolean;
  weightUnit: string;
  measurementSystem: string;
}
