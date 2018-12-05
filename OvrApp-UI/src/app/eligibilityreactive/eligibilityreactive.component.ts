import { Global } from './../shared/Global';
import { EligibilityService } from './../services/eligibility.service';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Input, Output, NgModule, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { IEligibility} from '../model/eligibility';
import {CommonSetting } from '../model/commonsetting';
import { TabsetComponent } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { LocalStorageService } from '../services/localstorage.service';
import { RecaptchaComponent } from 'ng-recaptcha';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  recordUpdate = false;
  requesttoReplace = false;
  RecaptaSiteKey: string = CommonSetting.RecaptaSiteKey;
  isRecaptaValid = false;
  IsReviewMode = false;
  IsEligibilityOn = false;
  nameSuffix = '';
  hideDLDetail = true;
  hideSSNDetail = true;
  modalRef: BsModalRef;
  message: string;
  editData: IEligibility;
  todayDate = new Date();
  startDate = new Date(this.todayDate.getFullYear() - 18, this.todayDate.getMonth() - 1, this.todayDate.getDate());
  NameSuffixList: string[] = ['I', 'II', 'III', 'IV', 'IX', 'JR', 'SR', 'V', 'VI', 'VII', 'VIII'];

  public DLPattern = { 'A': { pattern: new RegExp('^[A-Za-z]$') }, '0': { pattern: new RegExp('^[0-9]$') } };
  public SSNPattern = { '0': { pattern: new RegExp('^[0-9]$') } };


  formErrors = {
    'usCitizen': '',
    'notAFelon': '',
    'mentalIncompStatus': '',
    'flDlNum': '',
    'ssnLast4': '',
    'lastName': '',
    'firstName': '',
    'middleName': '',
    'dateOfBirth': '',
    'dlIssueDate': ''
    // 'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'usCitizen': {
      'required': 'UsCitizen is required.',
    },
    'notAFelon': {
      'required': 'NotAFelon is required.',
    },
    'mentalIncompStatus': {
      'required': 'MentalIncompStatus is required.',
    },
    'flDlNum': {
      'required': 'FlDlNum is required.',
      'minlength': 'FlDlNum must be greater than 2 characters.',
      'maxlength': 'FlDlNum must be less than 13 characters.'
    },
    'ssnLast4': {
      'required': 'SsnLast4 is required.',
      'maxlength': 'Last4SSN must be less than 4 characters.'
    },
    'lastName': {
      'required': 'LastName is required.'
    },
    'firstName': {
      'required': 'FirstName is required.'
    },
    'middleName': {
      'required': 'MiddleName is required.'
    },
    'dateOfBirth': {
      'required': 'DateOfBirth is required.'
    },

    'dlIssueDate': {
      'required': 'DL issue date is required.'
    }
  };




  @ViewChild('reCaptcha') reCaptcha: RecaptchaComponent;

  constructor(private fb: FormBuilder
    , private service: EligibilityService
    , private route: ActivatedRoute,
    private router: Router
    , private modalService: BsModalService
    , private sessionEService: LocalStorageService) {
      const eligibility = this.sessionEService.getEligibilityFromSession();
        const stepInfo = this.sessionEService.getStepFromSession();
        if (eligibility != null && stepInfo != null && typeof stepInfo !== 'undefined' && stepInfo !== '') {
         if (stepInfo === '2') {
           this.router.navigateByUrl('/rdform');
         }
       }
  }
  isStep1Valid = false;
  isStep2Valid = false;



  validateEligibility() {
    const isEValid = (this.eligibilityFrm.get('usCitizen').value === '1') && (this.eligibilityFrm.get('notAFelon').value === '1')
      && (this.eligibilityFrm.get('mentalIncompStatus').value === '1');
    if (isEValid) {
    } else {
    }
  }


  updateModelIntoSession(tabId: number) {
    const contactData = this.mapDateData(this.eligibilityFrm.value);
    contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;
    contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    contactData.currentTabId = tabId;
    this.sessionEService.SaveEligibilityToSession(contactData);
  }




  ngOnInit() {

    this.eligibilityFrm = this.fb.group({
      ovrApplicationId: [0],
      usCitizen: ['', Validators.required],
      notAFelon: ['', Validators.required],
      mentalIncompStatus: ['', Validators.required],
      voterClaimsNoSsnOrDln: [''],
      newRegistration: [''],
      recordUpdate: [''],
      requesttoReplace: [''],
      isDLAvailable: [''],
      isSSNAvailable: [''],
      //  FlDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.unamePattern)]],
      flDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
      ssnLast4: ['', [Validators.required, Validators.maxLength(4)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      nameSuffix : [''],
      // DateOfBirth: ['']
      dateOfBirth: ['', Validators.required],
      dlIssueDate: ['', Validators.required]
    });
    this.citizens = Global.citizens;

    this.isRecaptaValid = false;

    this.eligibilityFrm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.eligibilityFrm);
    });

    const modelFromSession = this.sessionEService.getEligibilityFromSession();
    if (modelFromSession != null && modelFromSession.ovrApplicationId > 0) {
      this.IsEligibilityOn = true;
      this.isRecaptaValid = false;
      this.isStep1Valid = false;
      this.pTabId = 2;

      this.service.getOneEligibility(modelFromSession.ovrApplicationId).subscribe((x) => {
        this.service.sharedEligibility = x;
        if (x.voterClaimsNoSsnOrDln === true) {
          this.eligibilityFrm.get('voterClaimsNoSsnOrDln').setValue(true);
          if (x.flDlNum === '' || x.flDlNum === null) {
          this.eligibilityFrm.get('isDLAvailable').setValue(true);
          this.setDLDetail();
          }
           if (x.ssnLast4 === '' || x.ssnLast4 === null) {
            this.eligibilityFrm.get('isSSNAvailable').setValue(true);
            this.setSSNDetail();
          }

        }


        this.eligibilityFrm.get('usCitizen').setValue(x.usCitizen === true ? '1' : '0');
        this.eligibilityFrm.get('notAFelon').setValue(x.notAFelon === true ? '1' : '0');
        this.eligibilityFrm.get('mentalIncompStatus').setValue(x.mentalIncompStatus === true ? '1' : '0');
        this.eligibilityFrm.get('newRegistration').setValue(x.newRegistration);
        this.eligibilityFrm.get('recordUpdate').setValue(x.recordUpdate);
        this.eligibilityFrm.get('requesttoReplace').setValue(x.requesttoReplace);
        this.eligibilityFrm.get('nameSuffix').setValue(x.nameSuffix);
        this.eligibilityFrm.get('ssnLast4').setValue(x.ssnLast4);
        this.eligibilityFrm.get('lastName').setValue(x.lastName);
        this.eligibilityFrm.get('firstName').setValue(x.firstName);
        this.eligibilityFrm.get('middleName').setValue(x.middleName);
        this.eligibilityFrm.get('dateOfBirth').setValue(x.dateOfBirth);
        this.eligibilityFrm.get('dlIssueDate').setValue(x.dlIssueDate);
        this.eligibilityFrm.get('ovrApplicationId').setValue(x.ovrApplicationId);
        this.enableEligibilityForm();
        this.sessionEService.SaveEligibilityToSession(x);
      });
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
    const modelFromSession = this.sessionEService.getEligibilityFromSession();
    const isEValid = (this.eligibilityFrm.get('usCitizen').value === '1') && (this.eligibilityFrm.get('notAFelon').value === '1')
      && (this.eligibilityFrm.get('mentalIncompStatus').value === '1')
      && this.eligibilityFrm.valid && this.isRecaptaValid;
    if (isEValid) {
      this.isStep1Valid = false;
      if (this.eligibilityFrm.get('isDLAvailable').value === true) {
        this.eligibilityFrm.get('voterClaimsNoSsnOrDln').setValue(true);
        this.eligibilityFrm.get('flDlNum').setValue('');
        this.eligibilityFrm.get('dlIssueDate').setValue('');
      }

      if (this.eligibilityFrm.get('isSSNAvailable').value === true) {
        this.eligibilityFrm.get('voterClaimsNoSsnOrDln').setValue(true);
        this.eligibilityFrm.get('ssnLast4').setValue('');
      }

      const contactData = this.mapDateData(formData.value);

      contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;
      contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
      contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;

      contactData.mentalIncompStatus = this.eligibilityFrm.get('mentalIncompStatus').value === '1' ? true : false;
      contactData.notAFelon = this.eligibilityFrm.get('notAFelon').value === '1' ? true : false;
      contactData.usCitizen = this.eligibilityFrm.get('usCitizen').value === '1' ? true : false;

     if (contactData.ovrApplicationId !== null && typeof contactData.ovrApplicationId !== 'undefined'
        && contactData.ovrApplicationId > 0) {
          const appId = contactData.ovrApplicationId;
          this.service.updateEligibility(appId, contactData).subscribe(
            (data: IEligibility) => {
              this.service.sharedEligibility = data;
              data.currentTabId = 1;
              this.sessionEService.SaveEligibilityToSession(data);
              // this.sessionEService.SaveStepToSession("2");
              //  this.router.navigateByUrl('/rdform');
              this.router.navigateByUrl('/review');
            }
          );
        }  else {
          this.service.addEligibility(contactData).subscribe(
            (data: IEligibility) => {
              this.service.sharedEligibility = data;
              data.currentTabId = 1;
              this.sessionEService.SaveEligibilityToSession(data);
            //  this.sessionEService.SaveStepToSession("2");
             // this.router.navigateByUrl('/rdform');
             this.router.navigateByUrl('/review');
            }
          );
        }

    } else {
      return false;
    }
  }

  selectTab(tabId: number) {
    if (tabId === 1) {
      console.log(this.eligibilityFrm.get('usCitizen').value);
      const isEValid = (this.eligibilityFrm.get('usCitizen').value === '1') && (this.eligibilityFrm.get('notAFelon').value === '1')
        && (this.eligibilityFrm.get('mentalIncompStatus').value === '1');
      if (isEValid) {
        this.IsEligibilityOn = isEValid;
        this.isStep1Valid = !isEValid;
        this.updateModelIntoSession(tabId);
        this.pTabId = tabId + 1;

      } else {
        this.IsEligibilityOn = false;
        this.isStep1Valid = true;
        this.pTabId = 1;
        return false;
      }
    }
  }

  mapDateData(customer: IEligibility): IEligibility {
    if (customer.dateOfBirth != null && customer.dateOfBirth !== '') {
      customer.dateOfBirth = new Date(customer.dateOfBirth).toISOString();
    }

    if (customer.dlIssueDate != null && customer.dlIssueDate !== '') {
      customer.dlIssueDate = new Date(customer.dlIssueDate).toISOString();
    }
    return customer;
  }
  setDefaultValues() {
   // this.eligibilityFrm.patchValue({ newRegistration: false, recordUpdate: false, requesttoReplace: false });
  // this.eligibilityFrm.setValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
  }

  setNewRegistrationStatus() {
    if (this.eligibilityFrm.get('newRegistration').value === true) {
      this.eligibilityFrm.get('requesttoReplace').setValue(false);
      this.eligibilityFrm.get('recordUpdate').setValue(false);
      this.isNewrecordUpdate = true;
    } else {

      this.isNewrecordUpdate = false;
    }
  }

  setNewRegistrationStatusFalse(event: any, check: any) {
    this.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    this.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    if (this.recordUpdate === true || this.requesttoReplace === true) {
      this.isNewRegistration = true;
      this.eligibilityFrm.get('newRegistration').setValue(false);
    } else {
      this.isNewRegistration = false;
    }

  }

  setDLDetail() {
    this.hideDLDetail = !this.hideDLDetail;

    if (!this.hideDLDetail) {
      this.eligibilityFrm.controls['flDlNum'].setValidators(null);
      this.eligibilityFrm.controls['dlIssueDate'].setValidators(null);
    } else {
      this.eligibilityFrm.controls['flDlNum'].setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(13)]);
      this.eligibilityFrm.controls['dlIssueDate'].setValidators([Validators.required]);
    }
    this.eligibilityFrm.controls['flDlNum'].updateValueAndValidity();
    this.eligibilityFrm.controls['dlIssueDate'].updateValueAndValidity();
  }
  setSSNDetail() {
    this.hideSSNDetail = !this.hideSSNDetail;
    if (!this.hideSSNDetail) {
      this.eligibilityFrm.controls['ssnLast4'].setValidators(null);
    } else {
      this.eligibilityFrm.controls['ssnLast4'].setValidators([Validators.required, Validators.maxLength(4)]);
    }

    this.eligibilityFrm.controls['ssnLast4'].updateValueAndValidity();
  }




  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.sessionEService.RemoveEligibilityFromSession();
    this.sessionEService.RemoveStepFromSession();
    this.ngOnInit();
    this.modalRef.hide();
    this.reCaptcha.reset(); // to reset captcha on cancel
    this.resolvedCaptcha(null);
  }

  decline(): void {
    this.modalRef.hide();

  }

  resolvedCaptcha(captchaResponse: string) {
    if (captchaResponse != null) {
      this.isRecaptaValid = true;
    } else {
      this.isRecaptaValid = false;
    }
  }


  EditMode() {
    this.IsReviewMode = !this.IsReviewMode;
     this.isRecaptaValid = false;
    const contactData = this.mapDateData(this.eligibilityFrm.value);
    contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;
    contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    this.editData = contactData;
  }

  enableEligibilityForm() {
    const isEValidp = (this.eligibilityFrm.get('usCitizen').value === '1') && (this.eligibilityFrm.get('notAFelon').value === '1')
        && (this.eligibilityFrm.get('mentalIncompStatus').value === '1');
     if (isEValidp) {
     }
  }
}
