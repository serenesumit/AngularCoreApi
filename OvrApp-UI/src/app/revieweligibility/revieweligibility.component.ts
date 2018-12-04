import { Component, OnInit,TemplateRef } from '@angular/core';
import { EligibilityService } from '../services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import {LocalStorageService} from '../services/localstorage.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-revieweligibility',
  templateUrl: './revieweligibility.component.html',
  styleUrls: ['./revieweligibility.component.css']
})
export class RevieweligibilityComponent implements OnInit {
  public getcustomer: any;
  myData: any;

  modalTitle: string;
  modalBtnTitle: string;
  constructor(private service: EligibilityService, private route: ActivatedRoute,
    private router: Router,
     private modalService: BsModalService,
    private sessionEService: LocalStorageService) { }

   
  ngOnInit() {
    var modelFromSession = this.sessionEService.getEligibilityFromSession();
   
    if (modelFromSession != null && modelFromSession.ovrApplicationId>0) {
      this.service.getOneEligibility(modelFromSession.ovrApplicationId).subscribe((x)=>{

        this.service.sharedEligibility = x;
       this.getcustomer = x;
       console.log(this.getcustomer);
      });      
    } 
        
    
  }
  navigatetoRd() {
    this.sessionEService.SaveStepToSession("2");
    this.router.navigateByUrl('/rdform');
}

editContact(id: number) {
  console.log('edit contact id is ' + id);
  this.sessionEService.SaveStepToSession("1");
// const contactData = this.service.sharedEligibility;
// console.log(contactData);
// this.service.sharedReview = contactData;
// this.service.getOneEligibility(id).subscribe( val => console.log(val));
// this.service.getOneEligibility(id).subscribe( val => this.service.sharedReview = val);

this.service.getOneEligibility(id).subscribe( response => {
  this.myData = response;
  console.log(this.myData);
  this.service.sharedReview = this.myData;
  this.router.navigateByUrl('/eligibilityreactive');

// const contactData = this.service.sharedReview;
// this.service.sharedReview = contactData1;

// console.log(contactData);

 // this.service.sharedReview = contactData;

// this.router.navigateByUrl('/eligibilityreactive');
}, error => {
  console.log(error);
});
}

modalRef: BsModalRef;
message: string;

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
}

confirm(): void {
  this.sessionEService.RemoveEligibilityFromSession();
  this.sessionEService.RemoveStepFromSession();
  this.modalRef.hide();
  this.router.navigateByUrl('/eligibilityreactive');   
}

decline(): void {
  this.modalRef.hide();

}




}
