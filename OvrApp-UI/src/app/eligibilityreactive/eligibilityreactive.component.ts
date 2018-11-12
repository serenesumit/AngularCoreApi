import { Global } from './../shared/Global';
import { EligibilityService } from './../services/eligibility.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { IEligibility, CommonSetting } from '../model/eligibility';
import { TabsetComponent } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-eligibilityreactive',
  templateUrl: './eligibilityreactive.component.html',
  styleUrls: ['./eligibilityreactive.component.css']
})
export class EligibilityreactiveComponent implements OnInit {
  eligibilityFrm: FormGroup;
  citizens = [];
  pTabId = 1;
  showNextButton = true;
  isNewRegistration = false;
  isNewrecordUpdate = false;
  RecordUpdate = false;
  RequesttoReplace = false;
  RecaptaSiteKey:string = CommonSetting.RecaptaSiteKey;
  isRecaptaValid:boolean = false;


  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  constructor(private fb: FormBuilder, private service: EligibilityService, private route: ActivatedRoute,
    private router: Router, private modalService: BsModalService, private sessionEService: LocalStorageService) {


      

    
    

  }
  disableEnable() {
    this.staticTabs.tabs[0].disabled = true;
    this.staticTabs.tabs[1].disabled = true;
    this.staticTabs.tabs[2].disabled = true;
  }

  isStep1Valid = false;
  isStep2Valid = false;
  public getcustomer: any;

  selectTab(tabId: number) {    
    if (tabId == 1) {
      //Eligiblity validation
      var isEValid = (this.eligibilityFrm.get('IsCitizen').value == 1) && (this.eligibilityFrm.get('IsFelon').value == 1)
        && (this.eligibilityFrm.get('IsMentalIncomp').value == 1);
      if (isEValid) {
        this.staticTabs.tabs[1].disabled = false;
        this.isStep1Valid = false;

        this.updateModelIntoSession(tabId);


      } else {
        this.staticTabs.tabs[1].disabled = true;
        this.isStep1Valid = true;

        return false;
      }
    }
    if (tabId == 2) {
      //second page validatation
      if (this.eligibilityFrm.valid && this.isRecaptaValid) {
        this.staticTabs.tabs[2].disabled = false;
        this.isStep2Valid = false;
        this.updateModelIntoSession(tabId);
        this.getcustomer = this.sessionEService.getEligibilityFromSession();
      } else {
        this.staticTabs.tabs[2].disabled = true;
        this.isStep2Valid = true;        
        return false;
      }
    }

    if(tabId==0){
      this.staticTabs.tabs[0].disabled = false;
    }
    this.staticTabs.tabs[tabId].active = true;
    this.pTabId = tabId + 1;
    if (tabId >= 2) {
      this.showNextButton = false;
    }
    this.disableEnable();
  }

  validateEligibility() {
    var isEValid = (this.eligibilityFrm.get('IsCitizen').value == 1) && (this.eligibilityFrm.get('IsFelon').value == 1)
      && (this.eligibilityFrm.get('IsMentalIncomp').value == 1);
    if (isEValid) {
      this.staticTabs.tabs[1].disabled = false;
    } else {
      this.staticTabs.tabs[1].disabled = true;
    }
  }


  updateModelIntoSession(tabId: number) {            
    const contactData = this.mapDateData(this.eligibilityFrm.value);
    contactData.NewRegistration = this.eligibilityFrm.get('NewRegistration').value;
    contactData.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
    contactData.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;
    //const contactData = new Eligibility(this.eligibilityFrm.get('IsCitizen').value, this.eligibilityFrm.get('IsFelon').value, this.eligibilityFrm.get('IsMentalIncomp').value);
    contactData.currentTabId = tabId;
    this.sessionEService.SaveEligibilityToSession(contactData);
  }


  formErrors = {
    'IsCitizen': '',
    'IsFelon': '',
    'IsMentalIncomp': '',
    'DLNumber': '',
    'LastSSN': '',
    'LastName': '',
    'FirstName': '',
    'MiddleName': '',
    'Dob': '',
    // 'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'IsCitizen': {
      'required': 'IsCitizen is required.',
    },
    'IsFelon': {
      'required': 'IsFelon is required.',
    },
    'IsMentalIncomp': {
      'required': 'IsMentalIncomp is required.',
    },
    'DLNumber': {
      'required': 'DLNumber is required.',
      'minlength': 'DLNumber must be greater than 2 characters.',
      'maxlength': 'DLNumber must be less than 13 characters.'
    },
    'LastSSN': {
      'required': 'LastSSN is required.',
      'maxlength': 'Last4SSN must be less than 4 characters.'
    },
    'LastName': {
      'required': 'LastName is required.'
    },
    'FirstName': {
      'required': 'FirstName is required.'
    },
    'MiddleName': {
      'required': 'MiddleName is required.'
    },
    'Dob': {
      'required': 'Dob is required.'
    }
  };


  public DLPattern = { 'A': { pattern: new RegExp('^[A-Za-z]$') }, '0': { pattern: new RegExp('^[0-9]$') } };
  public SSNPattern = { '0': { pattern: new RegExp('^[0-9]$') } };
  ngOnInit() {
    this.eligibilityFrm = this.fb.group({
      id: [''],
      IsCitizen: ['', Validators.required],
      IsFelon: ['', Validators.required],
      IsMentalIncomp: ['', Validators.required],

      NewRegistration: [''],
      RecordUpdate: [''],
      RequesttoReplace: [''],
      //  DLNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.unamePattern)]],
      DLNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
      LastSSN: ['', [Validators.required, Validators.maxLength(4)]],
      LastName: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      // Dob: ['']
      Dob: ['', Validators.required]      
    });
    this.citizens = Global.citizens;

    this.eligibilityFrm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.eligibilityFrm);
    });

    var modelFromSession = this.sessionEService.getEligibilityFromSession();
    if (modelFromSession != null) {
      this.eligibilityFrm.get('IsCitizen').setValue(modelFromSession.IsCitizen);
      this.eligibilityFrm.get('IsFelon').setValue(modelFromSession.IsFelon);
      this.eligibilityFrm.get('IsMentalIncomp').setValue(modelFromSession.IsMentalIncomp);

      this.eligibilityFrm.get('NewRegistration').setValue(modelFromSession.NewRegistration);
      this.eligibilityFrm.get('RecordUpdate').setValue(modelFromSession.RecordUpdate);
      this.eligibilityFrm.get('RequesttoReplace').setValue(modelFromSession.RequesttoReplace);
      this.eligibilityFrm.get('DLNumber').setValue(modelFromSession.DLNumber);
      this.eligibilityFrm.get('LastSSN').setValue(modelFromSession.LastSSN);
      this.eligibilityFrm.get('LastName').setValue(modelFromSession.LastName);
      this.eligibilityFrm.get('FirstName').setValue(modelFromSession.FirstName);
      this.eligibilityFrm.get('MiddleName').setValue(modelFromSession.MiddleName);
      this.eligibilityFrm.get('Dob').setValue(modelFromSession.Dob);          
      this.selectTab(modelFromSession.currentTabId);
    }  else{

      this.selectTab(0);
    }  
  }

  logValidationErrors(group: FormGroup = this.eligibilityFrm): void {    
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

  onSubmit(formData: any) {
    const contactData = this.mapDateData(formData.value);

    contactData.NewRegistration = this.eligibilityFrm.get('NewRegistration').value;
    contactData.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
    contactData.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;

    this.service.addEligibility(contactData).subscribe(
      (data: IEligibility) => {        
        this.service.sharedEligibility = contactData;
        // this.router.navigateByUrl('/getlist');
        this.sessionEService.RemoveEligibilityFromSession();        
        this.router.navigateByUrl('/review');
      }
    );
  }

  mapDateData(customer: IEligibility): IEligibility {
    if(customer.Dob!=null && customer.Dob!="")
    {
       customer.Dob = new Date(customer.Dob).toISOString();
    }    
    return customer;
  }
  setDefaultValues() {
    this.eligibilityFrm.patchValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
    // this.eligibilityFrm.setValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
  }


  setNewRegistrationStatus() {
    //this.isNewRegistration = this.eligibilityFrm.get('NewRegistration').value;

    if (this.eligibilityFrm.get('NewRegistration').value == true) {
      this.eligibilityFrm.get('RequesttoReplace').setValue(false);
      this.eligibilityFrm.get('RecordUpdate').setValue(false);
      this.isNewrecordUpdate = true;
    } else {

      this.isNewrecordUpdate = false;
    }
  }

  setNewRegistrationStatusFalse() {
    this.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
    this.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;
    if (this.RecordUpdate == true || this.RequesttoReplace == true) {
      this.isNewRegistration = true;
      this.eligibilityFrm.get('NewRegistration').setValue(false);
    } else {
      this.isNewRegistration = false;
    }

  }

  modalRef: BsModalRef;
  message: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {    
    this.sessionEService.RemoveEligibilityFromSession();
    this.ngOnInit();
    this.showNextButton=true;
    this.modalRef.hide();
  }

  decline(): void {
   
    
    this.modalRef.hide();
    
  }

  resolvedCaptcha(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);

    if(captchaResponse!=null){
      this.isRecaptaValid = true;
    }
  }
}
