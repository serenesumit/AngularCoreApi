import { Injectable } from '@angular/core';
import { IEligibility } from '../model/eligibility';

@Injectable()
export class LocalStorageService {
constructor(){};


  SaveEligibilityToSession(aU: IEligibility) {
    localStorage.setItem('eligibility', JSON.stringify(aU));
  }

  RemoveEligibilityFromSession() {    
    localStorage.removeItem('eligibility');
  }

  getEligibilityFromSession(){

    debugger;
    var item = localStorage.getItem('eligibility');
    var jsonObject: IEligibility = JSON.parse(item);
    return jsonObject;
  }  
}
