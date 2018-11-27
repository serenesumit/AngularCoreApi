import { Global } from './../shared/Global';
import { EligibilityService } from './../services/eligibility.service';
import { Component, OnInit, ViewChild, TemplateRef,EventEmitter,Input,Output,NgModule } from '@angular/core';
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
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {Step2Component} from './step2/step2.component';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ EligibilityreactiveComponent,Step2Component ],
  bootstrap: [ EligibilityreactiveComponent ]
})

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
  isRecaptaValid: boolean = false;
  IsReviewMode:boolean = false;
  IsEligibilityOn:boolean = false;
  nameSuffix:string ='';
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
      var isEValid = (this.eligibilityFrm.get('usCitizen').value == 1) && (this.eligibilityFrm.get('notAFelon').value == 1)
        && (this.eligibilityFrm.get('mentalIncompStatus').value == 1);
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
    var isEValid = (this.eligibilityFrm.get('usCitizen').value == 1) && (this.eligibilityFrm.get('notAFelon').value == 1)
      && (this.eligibilityFrm.get('mentalIncompStatus').value == 1);
    if (isEValid) {
      this.staticTabs.tabs[1].disabled = false;
    } else {
      this.staticTabs.tabs[1].disabled = true;
    }
  }


  updateModelIntoSession(tabId: number) {
    const contactData = this.mapDateData(this.eligibilityFrm.value);
    contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;
    contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    //const contactData = new Eligibility(this.eligibilityFrm.get('UsCitizen').value, this.eligibilityFrm.get('NotAFelon').value, this.eligibilityFrm.get('MentalIncompStatus').value);
    contactData.currentTabId = tabId;
    this.sessionEService.SaveEligibilityToSession(contactData);
  }


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
    'dlIssueDate':''
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


  public DLPattern = { 'A': { pattern: new RegExp('^[A-Za-z]$') }, '0': { pattern: new RegExp('^[0-9]$') } };
  public SSNPattern = { '0': { pattern: new RegExp('^[0-9]$') } };
  ngOnInit() {

    this.eligibilityFrm = this.fb.group({
      ovrApplicationId: [0],
      usCitizen: ['', Validators.required],
      notAFelon: ['', Validators.required],
      mentalIncompStatus: ['', Validators.required],

      newRegistration: [''],
      recordUpdate: [''],
      requesttoReplace: [''],
      isDLAvailable:[''],
      isSSNAvailable:[''],
      //  FlDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern(this.unamePattern)]],
      flDlNum: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
      ssnLast4: ['', [Validators.required, Validators.maxLength(4)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      nameSuffix :[''],
      // DateOfBirth: ['']
      dateOfBirth: ['', Validators.required],
      dlIssueDate:['', Validators.required]   
    });
    this.citizens = Global.citizens;

    this.eligibilityFrm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.eligibilityFrm);
    });

    var modelFromSession = this.sessionEService.getEligibilityFromSession(); 
    debugger;   
    if (modelFromSession != null && modelFromSession.ovrApplicationId>0) {
      this.service.getOneEligibility(modelFromSession.ovrApplicationId).subscribe((x)=>{

        console.log(x);  
        this.eligibilityFrm.get('usCitizen').setValue(x.usCitizen);
        this.eligibilityFrm.get('notAFelon').setValue(x.notAFelon);
        this.eligibilityFrm.get('mentalIncompStatus').setValue(x.mentalIncompStatus);
        this.eligibilityFrm.get('newRegistration').setValue(x.newRegistration);
        this.eligibilityFrm.get('recordUpdate').setValue(x.recordUpdate);
        this.eligibilityFrm.get('requesttoReplace').setValue(x.requesttoReplace);
        this.eligibilityFrm.get('flDlNum').setValue(x.flDlNum);
        this.eligibilityFrm.get('ssnLast4').setValue(x.ssnLast4);
        this.eligibilityFrm.get('lastName').setValue(x.lastName);
        this.eligibilityFrm.get('firstName').setValue(x.firstName);
        this.eligibilityFrm.get('middleName').setValue(x.middleName);
        this.eligibilityFrm.get('dateOfBirth').setValue(x.dateOfBirth);
        this.eligibilityFrm.get('dlIssueDate').setValue(x.dlIssueDate);    
        this.eligibilityFrm.get('ovrApplicationId').setValue(x.ovrApplicationId);  
          
        this.enableEligibilityForm();
        x.currentTabId = modelFromSession.currentTabId;
        this.sessionEService.SaveEligibilityToSession(x);
        this.selectTab(modelFromSession.currentTabId);      
      });      
    } else {
      this.selectTab(0);      
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

    var modelFromSession = this.sessionEService.getEligibilityFromSession(); 
    debugger;   
   
    var isEValid = (this.eligibilityFrm.get('usCitizen').value == 1) && (this.eligibilityFrm.get('notAFelon').value == 1)
      && (this.eligibilityFrm.get('mentalIncompStatus').value == 1)
      && this.eligibilityFrm.valid && this.isRecaptaValid;
    if (isEValid) {
      this.staticTabs.tabs[1].disabled = false;
      this.isStep1Valid = false;


      const contactData = this.mapDateData(formData.value);

      contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;      
      contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
      contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;

      contactData.mentalIncompStatus = this.eligibilityFrm.get('mentalIncompStatus').value=='1'?true:false;
      contactData.notAFelon = this.eligibilityFrm.get('notAFelon').value=='1'?true:false;
      contactData.usCitizen = this.eligibilityFrm.get('usCitizen').value=='1'?true:false;

     if(contactData.ovrApplicationId !=null && typeof contactData.ovrApplicationId !=="undefined"
        && contactData.ovrApplicationId >0)
        {
          var appId = contactData.ovrApplicationId;
          this.service.updateEligibility(appId,contactData).subscribe(
            (data: IEligibility) => {
              this.selectTab(1);
    
              debugger;
             
              this.service.sharedEligibility = data;
              data.currentTabId =1;
              this.sessionEService.SaveEligibilityToSession(data);
               
    
              // this.router.navigateByUrl('/getlist');
              //this.sessionEService.RemoveEligibilityFromSession();        
              //this.router.navigateByUrl('/review');
            }
          );
        }
        else{
          this.service.addEligibility(contactData).subscribe(
            (data: IEligibility) => {
              this.selectTab(1);
    
              debugger;
      console.log("Db data : ",data);
              this.service.sharedEligibility = data;
              data.currentTabId =1;
              this.sessionEService.SaveEligibilityToSession(data);
               console.log("Session data : ",this.sessionEService.getEligibilityFromSession());
    
              // this.router.navigateByUrl('/getlist');
              //this.sessionEService.RemoveEligibilityFromSession();        
              //this.router.navigateByUrl('/review');
            }
          );
        }

    } else {
      this.staticTabs.tabs[1].disabled = true;
      this.isStep1Valid = true;
      return false;
    }
  }

  mapDateData(customer: IEligibility): IEligibility {
    if (customer.dateOfBirth != null && customer.dateOfBirth != "") {
      customer.dateOfBirth = new Date(customer.dateOfBirth).toISOString();
    }

    if (customer.dlIssueDate != null && customer.dlIssueDate != "") {
      customer.dlIssueDate = new Date(customer.dlIssueDate).toISOString();
    }

    
    return customer;
  }
  setDefaultValues() {
    this.eligibilityFrm.patchValue({ newRegistration: false, recordUpdate: false, requesttoReplace: false });
    // this.eligibilityFrm.setValue({ NewRegistration: false, RecordUpdate: false, RequesttoReplace: false });
  }


  setNewRegistrationStatus() {
    //this.isNewRegistration = this.eligibilityFrm.get('NewRegistration').value;

    if (this.eligibilityFrm.get('newRegistration').value == true) {
      this.eligibilityFrm.get('requesttoReplace').setValue(false);
      this.eligibilityFrm.get('recordUpdate').setValue(false);
      this.isNewrecordUpdate = true;
    } else {

      this.isNewrecordUpdate = false;
    }
  }

  setNewRegistrationStatusFalse() {
    this.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    this.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    if (this.recordUpdate == true || this.requesttoReplace == true) {
      this.isNewRegistration = true;
      this.eligibilityFrm.get('newRegistration').setValue(false);
    } else {
      this.isNewRegistration = false;
    }

  }

  hideDLDetail:boolean= true;

  setDLDetail(){    
    this.hideDLDetail = !this.hideDLDetail;

    if(!this.hideDLDetail){      
      this.eligibilityFrm.controls['flDlNum'].setValidators(null);
      this.eligibilityFrm.controls['dlIssueDate'].setValidators(null);
      
      
    }else{
      this.eligibilityFrm.controls['flDlNum'].setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(13)]);      
      this.eligibilityFrm.controls['dlIssueDate'].setValidators([Validators.required]); 
    }   
    this.eligibilityFrm.controls['flDlNum'].updateValueAndValidity(); 
    this.eligibilityFrm.controls['dlIssueDate'].updateValueAndValidity(); 
  }
  hideSSNDetail:boolean= true;
  setSSNDetail(){
    this.hideSSNDetail = !this.hideSSNDetail;
    if(!this.hideSSNDetail){      
      this.eligibilityFrm.controls['ssnLast4'].setValidators(null);                  
    }else{      
      this.eligibilityFrm.controls['ssnLast4'].setValidators([Validators.required,Validators.maxLength(4)]); 
    }  

    this.eligibilityFrm.controls['ssnLast4'].updateValueAndValidity(); 
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
    contactData.newRegistration = this.eligibilityFrm.get('newRegistration').value;
    contactData.recordUpdate = this.eligibilityFrm.get('recordUpdate').value;
    contactData.requesttoReplace = this.eligibilityFrm.get('requesttoReplace').value;
    console.log(contactData);    
    this.editData = contactData;
  }

  enableEligibilityForm(){    
    var isEValidp = (this.eligibilityFrm.get('usCitizen').value == 1) && (this.eligibilityFrm.get('notAFelon').value == 1)
        && (this.eligibilityFrm.get('mentalIncompStatus').value == 1);            
      this.IsEligibilityOn = isEValidp;      
      this.isStep1Valid = !isEValidp;
  }
}
