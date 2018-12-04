import { Component, OnInit,TemplateRef } from '@angular/core';
import { EligibilityService } from '../services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import {LocalStorageService} from '../services/localstorage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.css']
})
export class ReviewformComponent implements OnInit {

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
debugger;
        console.log(x);  
        this.service.sharedEligibility = x;
       this.getcustomer = x;
       console.log(this.getcustomer);
      });      
    } 
        
    
  }
  navigatetoRd() {
    this.router.navigateByUrl('/rdform');
}

editContact(id: number) {
  console.log('edit contact id is ' + id);
  this.sessionEService.SaveStepToSession("2");
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

openAddressModal(template: TemplateRef<any>) {
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
