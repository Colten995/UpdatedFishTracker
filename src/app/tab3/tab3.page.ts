import { Component } from '@angular/core';
import{ FishManagerService } from '../fish-manager.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  constructor(public fishManager : FishManagerService,) 
  {}
}
