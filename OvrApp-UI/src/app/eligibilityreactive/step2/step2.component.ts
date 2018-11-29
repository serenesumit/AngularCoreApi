import { Component, HostListener, OnInit, TemplateRef,EventEmitter,Input,Output,NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EligibilityService } from 'src/app/services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/shared/Global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { fakeAsync } from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/localstorage.service';
import { IEligibility, CommonSetting } from '../../model/eligibility';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  clearLocalStorage(event){
    this.sessionEService.RemoveEligibilityFromSession();
    this.sessionEService.RemoveStepFromSession();
  }

  RdFrm: FormGroup;
  technologies = [];
  partys = [];

 
  mailingAddSameAsResi = true;
  constructor(private fb: FormBuilder, private service: EligibilityService, private route: ActivatedRoute,
    private router: Router,private modalService: BsModalService,
    private sessionEService: LocalStorageService) {
      var eligibility = this.sessionEService.getEligibilityFromSession();
      if(eligibility == null || eligibility.ovrApplicationId < 0)
     {
         this.router.navigateByUrl('/eligibilityreactive');
     }

     }

    formErrors = {
      'resStreetNumber': '',
      'partyAffiliation': '',
      'resStreetName': '',
      'resUspsCityName':'',
      'resZipCode':'',
      'mailingAddSameAsResi':'',
      'gender':'',
      'daytimePhone':'',
      'publicEmailAddress':'',
      'emailConfirmation':'',
      'VotingAssistRequired':'',
'pollWorkerVolunteer':''
    };
    // This object contains all the validation messages for this form
  validationMessages = {    
    'resStreetNumber': {
      'required': 'Street Number is required.',
      'minlength': 'Street Number must be greater than 2 characters.',
      'maxlength': 'Street Number must be less than 13 characters.'
    }   ,
    'partyAffiliation': {
      'required': 'Party Affiliation Number is required.'      
    },
    'resStreetName': {
      'required': 'Street Name is required.',
      'minlength': 'Street Name must be greater than 5 characters.',
      'maxlength': 'Street Name must be less than 100 characters.'
    }   ,
    'resUspsCityName':{
      'required': 'City is required.'            
    }  
    ,
    'resZipCode':{
      'required': 'Zip Code is required.',
      'minlength': 'Zip Code must be greater than 5 characters.',
      'maxlength': 'Zip Code must be less than 10 characters.'            
    }    ,
  
    'gender' :{
      'required': 'Gender is required.'      
    },
    'daytimePhone':{
      'required': 'Phone Number is required.',
      'minlength': 'Phone Number must be greater than 10 characters.',
      'maxlength': 'Phone Number Name must be less than 12 characters.'            
    } ,    
    'publicEmailAddress':{
      'email': 'Enter email in correct format.'
    } ,
    'emailConfirmation':{
      'email': 'Enter email in correct format.'
    } ,
    'votingAssistRequired':{
      'required': 'Selection is required.'      
    },
    'pollWorkerVolunteer':{
      'required': 'Selection is required.'      
    }

    
  };
  
  public ZipCodePattern = {'0': { pattern: new RegExp('^[0-9]$') } };  
  public PhonePattern = {'0': { pattern: new RegExp('^[0-9]$') } };
    ngOnInit() {      
      this.RdFrm = this.fb.group({
        partyAffiliation: ['', Validators.required],
        resStreetNumberSuffix :[''],
        resStreetNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
        resStreetPreDirection :[''],
        resStreetName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        resStreetType :[''],
        resStreetPostDirection :[''],
        resUnitType :[''],
        resUnitNumber :[''],
        resZipCodePlus4 :[''],
        resUspsCityName: ['', Validators.required],
        resZipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],        
        countyOfResidence :[''],
        mailingAddSameAsResi: [''],
        mailAddrLine1:[''],
        mailAddrLine2:[''],
        mailAddrLine3:[''],
        mailAddrCity:[''],
        mailAddrZip:[''],
        mailAddrState:[''],
        mailAddrCountry:[''],

        formerAddrLine1:[''],
        formerAddrLine2:[''],
        fromerAddrLine3:[''],
        formerAddrCity:[''],
        formerAddrZip:[''],
        formerAddrState:[''],
        formerAddrCountry:[''],
        formerFirstName:[''],
        formerLastName:[''],
        formerMiddleName:[''],
        raceId:[''],

        placeOfBirth:[''],
        military:[false],
        
        
        gender : ['', Validators.required],
        daytimePhone:['', null],
        publicEmailAddress:['', Validators.email],
        emailConfirmation:['', Validators.email],
        votingAssistRequired:[false,Validators.required],
        pollWorkerVolunteer:[false,Validators.required]
      });

      var modelFromSession = this.sessionEService.getEligibilityFromSession(); 
      if (modelFromSession != null && modelFromSession.ovrApplicationId>0) {
        this.service.getOneEligibility(modelFromSession.ovrApplicationId).subscribe((x)=>{

         this.RdFrm.get('partyAffiliation').setValue(x.partyAffiliation);
        this.RdFrm.get('resStreetNumberSuffix').setValue(x.resStreetNumberSuffix);
        this.RdFrm.get('resStreetNumber').setValue(x.resStreetNumber);
        this.RdFrm.get('resStreetPreDirection').setValue(x.resStreetPreDirection);
        this.RdFrm.get('resStreetPreDirection').setValue(x.resStreetPreDirection);
        this.RdFrm.get('resStreetName').setValue(x.resStreetName);
        this.RdFrm.get('resStreetType').setValue(x.resStreetType);
        this.RdFrm.get('resStreetPostDirection').setValue(x.resStreetPostDirection);

        this.RdFrm.get('resUnitType').setValue(x.resUnitType);
        this.RdFrm.get('resUnitNumber').setValue(x.resUnitNumber);
        this.RdFrm.get('resZipCodePlus4').setValue(x.resZipCodePlus4);
        this.RdFrm.get('resZipCode').setValue(x.resZipCode);
        this.RdFrm.get('countyOfResidence').setValue(x.countyOfResidence);
        this.RdFrm.get('mailingAddSameAsResi').setValue(x.mailingAddSameAsResi==true? "1":"0");
        this.RdFrm.get('mailAddrLine1').setValue(x.mailAddrLine1);
        this.RdFrm.get('mailAddrLine2').setValue(x.mailAddrLine2);
        this.RdFrm.get('mailAddrLine3').setValue(x.mailAddrLine3);
        this.RdFrm.get('mailAddrCity').setValue(x.mailAddrCity);
        this.RdFrm.get('mailAddrZip').setValue(x.mailAddrZip);
        this.RdFrm.get('mailAddrState').setValue(x.mailAddrState);
        this.RdFrm.get('mailAddrCountry').setValue(x.mailAddrCountry);


        this.RdFrm.get('formerAddrLine1').setValue(x.formerAddrLine1);
        this.RdFrm.get('formerAddrLine2').setValue(x.formerAddrLine2);
        this.RdFrm.get('fromerAddrLine3').setValue(x.fromerAddrLine3);
        this.RdFrm.get('formerAddrCity').setValue(x.formerAddrCity);
        this.RdFrm.get('formerAddrZip').setValue(x.formerAddrZip);
        this.RdFrm.get('formerAddrState').setValue(x.formerAddrState);
        this.RdFrm.get('formerAddrCountry').setValue(x.formerAddrCountry);
        this.RdFrm.get('formerFirstName').setValue(x.formerFirstName);
        this.RdFrm.get('formerLastName').setValue(x.formerLastName);
        this.RdFrm.get('formerMiddleName').setValue(x.formerMiddleName);
        this.RdFrm.get('raceId').setValue(x.raceId);

        this.RdFrm.get('placeOfBirth').setValue(x.placeOfBirth);
        this.RdFrm.get('military').setValue(x.military==true? "1":"0");
        this.RdFrm.get('gender').setValue(x.gender);
        this.RdFrm.get('daytimePhone').setValue(x.daytimePhone);
        this.RdFrm.get('publicEmailAddress').setValue(x.publicEmailAddress);
        this.RdFrm.get('emailConfirmation').setValue(x.emailConfirmation);
        this.RdFrm.get('votingAssistRequired').setValue(x.votingAssistRequired==true? "1":"0");
        this.RdFrm.get('pollWorkerVolunteer').setValue(x.pollWorkerVolunteer==true? "1":"0");

          
        });      
      }


      this.technologies = Global.technologies;
      this.partys = Global.partys;
    }


    logValidationErrors(group: FormGroup = this.RdFrm): void {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        } else {
          this.formErrors[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
            const messages = this.validationMessages[key];
            for (const errorKey in abstractControl.errors) {
              if (errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
              }
            }
          }
        }
      });
    }


    modalRef: BsModalRef;
  message: string;

  openAddressModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {  
    this.modalRef.hide();    
  }

  decline(): void {
    this.modalRef.hide();
  }



  onSubmit(formData: any) {

    var modelFromSession = this.sessionEService.getEligibilityFromSession(); 
    debugger;   
    const contactData = this.mapDateData(formData.value);
    contactData.mentalIncompStatus = this.RdFrm.get('votingAssistRequired').value=='1'?true:false;
    contactData.notAFelon = this.RdFrm.get('pollWorkerVolunteer').value=='1'?true:false;
    contactData.mailingAddSameAsResi = this.RdFrm.get('mailingAddSameAsResi').value=='1'?true:false;
    contactData.ovrApplicationId = modelFromSession.ovrApplicationId;


     if(modelFromSession.ovrApplicationId !=null && typeof modelFromSession.ovrApplicationId !=="undefined"
        && modelFromSession.ovrApplicationId > 0)
        {
          var appId = modelFromSession.ovrApplicationId;
          this.service.updateEligibility(appId,contactData).subscribe(
            (data: IEligibility) => {
             
              this.service.sharedEligibility = data;
              this.sessionEService.SaveEligibilityToSession(data);
            }
          );
        }
        else
        {
          // this.sessionEService.RemoveEligibilityFromSession();
          // this.router.navigateByUrl('/eligibilityreactive');
        }
  }

  mapDateData(customer: IEligibility): IEligibility {
   
    return customer;
  }



}
