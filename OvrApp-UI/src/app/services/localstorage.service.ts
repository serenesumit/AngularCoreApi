import { Injectable } from '@angular/core';
import { IEligibility } from '../model/eligibility';

@Injectable()
export class LocalStorageService {
constructor() {}


  SaveEligibilityIdToSession(overApplicationId: number ) {
    sessionStorage.setItem('overApplicationId', JSON.stringify(overApplicationId));
  }

  RemoveEligibilityIdFromSession() {
    sessionStorage.removeItem('overApplicationId');
  }

  getStepFromSession() {
   return sessionStorage.getItem('step');
  }

  SaveStepToSession(aU: string) {
    sessionStorage.setItem('step', aU);
  }

  RemoveStepFromSession() {
    sessionStorage.removeItem('step');
  }

  getEligibilityIdFromSession() {
  return JSON.parse(sessionStorage.getItem('overApplicationId'));
  }
}
