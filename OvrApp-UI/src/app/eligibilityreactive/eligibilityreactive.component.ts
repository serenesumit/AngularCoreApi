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
import { RecaptchaComponent } from 'ng-recaptcha';

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
  RecaptaSiteKey: string = CommonSetting.RecaptaSiteKey;
  isRecaptaValid: boolean = false;
  IsReviewMode:boolean = false;
  IsEligibilityOn:boolean = false;
  //startDate = new Date(1990, 0, 1);
  todayDate = new Date();
  startDate =new Date(this.todayDate.getFullYear()-18, this.todayDate.getMonth()-1, this.todayDate.getDate());
  NameSuffixList: string[] = ['I', 'II', 'III','IV','IX','JR','SR','V','VI','VII','VIII'];  

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('reCaptcha') reCaptcha: RecaptchaComponent;

  constructor(private fb: FormBuilder
    , private service: EligibilityService
    , private route: ActivatedRoute,
    private router: Router
    , private modalService: BsModalService
    , private sessionEService: LocalStorageService) {

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
      var isEValid = (this.eligibilityFrm.get('UsCitizen').value == 1) && (this.eligibilityFrm.get('NotAFelon').value == 1)
        && (this.eligibilityFrm.get('MentalIncompStatus').value == 1);
        //&& this.eligibilityFrm.valid && this.isRecaptaValid;
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
      // if (this.eligibilityFrm.valid && this.isRecaptaValid) {
      //   this.staticTabs.tabs[2].disabled = false;
      //   this.isStep2Valid = false;
      this.updateModelIntoSession(tabId);
      //   this.getcustomer = this.sessionEService.getEligibilityFromSession();
      // } else {
      //   this.staticTabs.tabs[2].disabled = true;
      //   this.isStep2Valid = true;        
      //   return false;
      // }

      this.staticTabs.tabs[2].disabled = false;
      this.getcustomer = this.sessionEService.getEligibilityFromSession();
    }

    if (tabId == 0) {
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
    var isEValid = (this.eligibilityFrm.get('UsCitizen').value == 1) && (this.eligibilityFrm.get('NotAFelon').value == 1)
      && (this.eligibilityFrm.get('MentalIncompStatus').value == 1);
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
    //const contactData = new Eligibility(this.eligibilityFrm.get('UsCitizen').value, this.eligibilityFrm.get('NotAFelon').value, this.eligibilityFrm.get('MentalIncompStatus').value);
    contactData.currentTabId = tabId;
    this.sessionEService.SaveEligibilityToSession(contactData);
  }


  formErrors = {
    'UsCitizen': '',
    'NotAFelon': '',
    'MentalIncompStatus': '',
    'FlDlNum': '',
    'SsnLast4': '',
    'LastName': '',
    'FirstName': '',
    'MiddleName': '',
    'DateOfBirth': '',
    'DlIssueDate':'',
    'NameSuffix':''
    // 'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'UsCitizen': {
      'required': 'UsCitizen is required.',
    },
    'NotAFelon': {
      'required': 'NotAFelon is required.',
    },
    'MentalIncompStatus': {
      'required': 'MentalIncompStatus is required.',
    },
    'FlDlNum': {
      'required': 'FlDlNum is required.',
      'minlength': 'FlDlNum must be greater than 2 characters.',
      'maxlength': 'FlDlNum must be less than 13 characters.'
    },
    'SsnLast4': {
      'required': 'SsnLast4 is required.',
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
    'DateOfBirth': {
      'required': 'DateOfBirth is required.'
    },

    'DlIssueDate': {
      'required': 'DL issue date is required.'
    },
    'NameSuffix': {
      'required': 'NameSuffix is required.'
    }
    
    
  };


  public DLPattern = { 'A': { pattern: new RegExp('^[A-Za-z]$') }, '0': { pattern: new RegExp('^[0-9]$') } };
  public SSNPattern = { '0': { pattern: new RegExp('^[0-9]$') } };
  ngOnInit() {

    this.eligibilityFrm = this.fb.group({
      id: [''],
      UsCitizen: ['', Validators.required],
      NotAFelon: ['', Validators.required],
      MentalIncompStatus: ['', Validators.required],

      NewRegistration: [''],
      RecordUpdate: [''],
      RequesttoReplace: [''],
      IsDLAvailable:[''],
      IsSSNAvailable:[''],
      //  FlDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.unamePattern)]],
      FlDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
      SsnLast4: ['', [Validators.required, Validators.maxLength(4)]],
      LastName: ['', Validators.required],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      // DateOfBirth: ['']
      DateOfBirth: ['', Validators.required],
      DlIssueDate:['', Validators.required],
      NameSuffix:['', Validators.required]      
    });
    this.citizens = Global.citizens;

    this.eligibilityFrm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.eligibilityFrm);
    });

    var modelFromSession = this.sessionEService.getEligibilityFromSession();    
    if (modelFromSession != null) {
      this.eligibilityFrm.get('UsCitizen').setValue(modelFromSession.UsCitizen);
      this.eligibilityFrm.get('NotAFelon').setValue(modelFromSession.NotAFelon);
      this.eligibilityFrm.get('MentalIncompStatus').setValue(modelFromSession.MentalIncompStatus);
      this.eligibilityFrm.get('NewRegistration').setValue(modelFromSession.NewRegistration);
      this.eligibilityFrm.get('RecordUpdate').setValue(modelFromSession.RecordUpdate);
      this.eligibilityFrm.get('RequesttoReplace').setValue(modelFromSession.RequesttoReplace);
      this.eligibilityFrm.get('FlDlNum').setValue(modelFromSession.FlDlNum);
      this.eligibilityFrm.get('SsnLast4').setValue(modelFromSession.SsnLast4);
      this.eligibilityFrm.get('LastName').setValue(modelFromSession.LastName);
      this.eligibilityFrm.get('FirstName').setValue(modelFromSession.FirstName);
      this.eligibilityFrm.get('MiddleName').setValue(modelFromSession.MiddleName);
      this.eligibilityFrm.get('DateOfBirth').setValue(modelFromSession.DateOfBirth);
      this.eligibilityFrm.get('DlIssueDate').setValue(modelFromSession.DlIssueDate);        
      this.enableEligibilityForm();
      this.selectTab(modelFromSession.currentTabId);      
    } else {
      this.selectTab(0);
      this.eligibilityFrm.get('UsCitizen').setValue('0');
      this.eligibilityFrm.get('NotAFelon').setValue('0');
      this.eligibilityFrm.get('MentalIncompStatus').setValue('0');
    }
    this.isStep1Valid = false;        
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



    var isEValid = (this.eligibilityFrm.get('UsCitizen').value == 1) && (this.eligibilityFrm.get('NotAFelon').value == 1)
      && (this.eligibilityFrm.get('MentalIncompStatus').value == 1)
      && this.eligibilityFrm.valid && this.isRecaptaValid;
    if (isEValid) {
      this.staticTabs.tabs[1].disabled = false;
      this.isStep1Valid = false;


      const contactData = this.mapDateData(formData.value);

      contactData.NewRegistration = this.eligibilityFrm.get('NewRegistration').value;      
      contactData.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
      contactData.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;

      contactData.MentalIncompStatus = this.eligibilityFrm.get('MentalIncompStatus').value=='1'?true:false;
      contactData.NotAFelon = this.eligibilityFrm.get('NotAFelon').value=='1'?true:false;
      contactData.UsCitizen = this.eligibilityFrm.get('UsCitizen').value=='1'?true:false;

      this.service.addEligibility(contactData).subscribe(
        (data: IEligibility) => {
          this.selectTab(1);
          this.service.sharedEligibility = contactData;

          // this.router.navigateByUrl('/getlist');
          //this.sessionEService.RemoveEligibilityFromSession();        
          //this.router.navigateByUrl('/review');
        }
      );

    } else {
      this.staticTabs.tabs[1].disabled = true;
      this.isStep1Valid = true;
      return false;
    }
  }

  mapDateData(customer: IEligibility): IEligibility {
    if (customer.DateOfBirth != null && customer.DateOfBirth != "") {
      customer.DateOfBirth = new Date(customer.DateOfBirth).toISOString();
    }

    if (customer.DlIssueDate != null && customer.DlIssueDate != "") {
      customer.DlIssueDate = new Date(customer.DlIssueDate).toISOString();
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

  hideDLDetail:boolean= true;

  setDLDetail(){    
    this.hideDLDetail = !this.hideDLDetail;

    if(!this.hideDLDetail){      
      this.eligibilityFrm.controls['FlDlNum'].setValidators(null);
      this.eligibilityFrm.controls['DlIssueDate'].setValidators(null);
      
      
    }else{
      this.eligibilityFrm.controls['FlDlNum'].setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(13)]);      
      this.eligibilityFrm.controls['DlIssueDate'].setValidators([Validators.required]); 
    }   
    this.eligibilityFrm.controls['FlDlNum'].updateValueAndValidity(); 
    this.eligibilityFrm.controls['DlIssueDate'].updateValueAndValidity(); 
  }
  hideSSNDetail:boolean= true;
  setSSNDetail(){
    this.hideSSNDetail = !this.hideSSNDetail;
    if(!this.hideSSNDetail){      
      this.eligibilityFrm.controls['SsnLast4'].setValidators(null);                  
    }else{      
      this.eligibilityFrm.controls['SsnLast4'].setValidators([Validators.required,Validators.maxLength(4)]); 
    }  

    this.eligibilityFrm.controls['SsnLast4'].updateValueAndValidity(); 
  }


  modalRef: BsModalRef;
  message: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.sessionEService.RemoveEligibilityFromSession();
    this.ngOnInit();
    this.showNextButton = true;
    this.IsReviewMode = false; 
       
    this.modalRef.hide();    
    this.reCaptcha.reset(); //to reset captcha on cancel 
    this.resolvedCaptcha(null);    
  }

  decline(): void {


    this.modalRef.hide();

  }

  resolvedCaptcha(captchaResponse: string) {    
    if (captchaResponse != null) {
      this.isRecaptaValid = true;
    }else{
      this.isRecaptaValid = false;
    }
  }


  editData:IEligibility;
  EditMode(){
    this.IsReviewMode=!this.IsReviewMode;
    // this.isRecaptaValid = false;    
    const contactData = this.mapDateData(this.eligibilityFrm.value);
    contactData.NewRegistration = this.eligibilityFrm.get('NewRegistration').value;
    contactData.RecordUpdate = this.eligibilityFrm.get('RecordUpdate').value;
    contactData.RequesttoReplace = this.eligibilityFrm.get('RequesttoReplace').value;
    console.log(contactData);    
    this.editData = contactData;
  }

  enableEligibilityForm(){    
    var isEValidp = (this.eligibilityFrm.get('UsCitizen').value == 1) && (this.eligibilityFrm.get('NotAFelon').value == 1)
        && (this.eligibilityFrm.get('MentalIncompStatus').value == 1);            
      this.IsEligibilityOn = isEValidp;      
      this.isStep1Valid = !isEValidp;
  }
}
