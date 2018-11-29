import { Component,HostListener } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // template: '<app-eligibilityreactive></app-eligibilityreactive>'
})
export class AppComponent {
  title = 'OvrApp-UI';
  constructor(private sessionEService: LocalStorageService){}

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
    this.sessionEService.RemoveEligibilityFromSession();
    this.sessionEService.RemoveStepFromSession();
  }
}
