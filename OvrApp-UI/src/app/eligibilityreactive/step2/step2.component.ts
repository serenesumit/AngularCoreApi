import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EligibilityService } from 'src/app/services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/shared/Global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  RdFrm: FormGroup;
  technologies = [];
  partys = [];
  IsMailingAddressDetail = true;
  constructor(private fb: FormBuilder, private service: EligibilityService, private route: ActivatedRoute,
    private router: Router,private modalService: BsModalService) { }




    formErrors = {
      'StreetNumber': '',
      'PartyAffiliation': '',
      'StreetName': '',
      'CityName':'',
      'ZipCode':'',
      'IsMailingAddress':'',
      'Gender':'',
      'Email':'',
      'ConfirmEmail':'',
      'VotingAssistRequired':'',
'PoolWorkerVolunteer':''
    };
    // This object contains all the validation messages for this form
  validationMessages = {    
    'StreetNumber': {
      'required': 'Street Number is required.',
      'minlength': 'Street Number must be greater than 2 characters.',
      'maxlength': 'Street Number must be less than 13 characters.'
    }   ,
    'PartyAffiliation': {
      'required': 'Party Affiliation Number is required.'      
    },
    'StreetName': {
      'required': 'Street Name is required.',
      'minlength': 'Street Name must be greater than 5 characters.',
      'maxlength': 'Street Name must be less than 100 characters.'
    }   ,
    'CityName':{
      'required': 'City is required.'            
    }  
    ,
    'ZipCode':{
      'required': 'Zip Code is required.',
      'minlength': 'Zip Code must be greater than 5 characters.',
      'maxlength': 'Zip Code must be less than 10 characters.'            
    }    ,
    'IsMailingAddress' :{
      'required': 'Selection is required.'      
    },
    'Gender' :{
      'required': 'Gender is required.'      
    },
    'PhoneNumber':{
      'required': 'Phone Number is required.',
      'minlength': 'Phone Number must be greater than 10 characters.',
      'maxlength': 'Phone Number Name must be less than 12 characters.'            
    } ,    
    'Email':{
      'email': 'Enter email in correct format.'
    } ,
    'ConfirmEmail':{
      'email': 'Enter email in correct format.'
    } ,
    'VotingAssistRequired':{
      'required': 'Selection is required.'      
    },
    'PoolWorkerVolunteer':{
      'required': 'Selection is required.'      
    }

    
  };
  
  public ZipCodePattern = {'0': { pattern: new RegExp('^[0-9]$') } };  
  public PhonePattern = {'0': { pattern: new RegExp('^[0-9]$') } };
    ngOnInit() {      
      this.RdFrm = this.fb.group({
        PartyAffiliation: ['', Validators.required],
        StreetNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
        StreetName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        CityName: ['', Validators.required],
        ZipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],        
        IsMailingAddress: ['', Validators.required],
        Gender : ['', Validators.required],
        PhoneNumber:['', null],
        Email:['', Validators.email],
        ConfirmEmail:['', Validators.email],
        VotingAssistRequired:['',Validators.required],
        PoolWorkerVolunteer:['',Validators.required]
      });
      this.technologies = Global.technologies;
      this.partys = Global.partys;

      this.RdFrm.get('IsMailingAddress').setValue('1');
      this.RdFrm.get('Gender').setValue('1');
      this.RdFrm.get('VotingAssistRequired').setValue('1');
      this.RdFrm.get('PoolWorkerVolunteer').setValue('1');
      
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
}
