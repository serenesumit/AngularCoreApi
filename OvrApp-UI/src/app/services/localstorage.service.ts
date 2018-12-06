import { Injectable } from '@angular/core';
import { IEligibility } from '../model/eligibility';

@Injectable()
export class LocalStorageService {
constructor() {}


  SaveEligibilityIdToSession(overApplicationId: number ) {
    localStorage.setItem('overApplicationId', JSON.stringify(overApplicationId));
  }

  RemoveEligibilityIdFromSession() {
    localStorage.removeItem('overApplicationId');
  }

  getStepFromSession() {
   return localStorage.getItem('step');
  }


  SaveStepToSession(aU: string) {
    localStorage.setItem('step', aU);
  }

  RemoveStepFromSession() {
    localStorage.removeItem('step');
  }

  getEligibilityIdFromSession() {
  return JSON.parse(localStorage.getItem('overApplicationId'));
  }
}
