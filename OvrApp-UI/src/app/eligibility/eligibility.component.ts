import { EligibilityService } from './../services/eligibility.service';
import { IEligibility } from './../model/eligibility';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.css']
})
export class EligibilityComponent implements OnInit {

  dataSaved = false;
  eligibilityForm: FormGroup;
  allEligibility$: Observable<IEligibility[]>;

  constructor(private formBuilder: FormBuilder, private eligibilityService: EligibilityService) { }

  ngOnInit() {
    this.eligibilityForm = this.formBuilder.group({
      usCitizen: ['', [ Validators.required ] ],
      notAFelon: ['', [ Validators.required ] ],
      mentalIncompStatus: ['', [ Validators.required ] ],
      newRegistration: ['', [ Validators.required ] ],
      recordUpdate: ['', [ Validators.required ] ],
      requesttoReplace: ['', [ Validators.required ] ],
      flDlNum: ['', [ Validators.required ] ],
      ssnLast4: ['', [ Validators.required ] ],
      dlIssueDate: ['', [ Validators.required ] ],
      lastName: ['', [ Validators.required ] ],
      firstName: ['', [ Validators.required ] ],
      middleName: ['', [ Validators.required ] ],
    });
    this.saveEligibility();

  }

  onFormSubmit() {
    this.dataSaved = false;
    const eligibility = this.eligibilityForm.value;
    this.eligibilityService.getAllEligibility('').subscribe(eligibilitys => {
      this.createEligibility(eligibility);
    });
    this.eligibilityForm.reset();
  }

  createEligibility(eligibility: IEligibility) {
    this.eligibilityService.addEligibility(eligibility).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      eligibility => {
        console.log(eligibility);
        this.dataSaved = true;
        this.loadAllEligibilitys();
      },
      err => {
        console.log(err);
      }
    );
  }
  loadAllEligibilitys() {
    this.allEligibility$ = this.eligibilityService.getAllEligibility('');
 }

//  get UsCitizen() {
//   return this.eligibilityForm.get('UsCitizen');
// }
// get NotAFelon() {
//   return this.eligibilityForm.get('NotAFelon');
// }
// get MentalIncompStatus() {
//   return this.eligibilityForm.get('MentalIncompStatus');
// }
// get NewRegistration() {
//   return this.eligibilityForm.get('NewRegistration');
// }
// get RecordUpdate() {
//   return this.eligibilityForm.get('RecordUpdate');
// }
// get RequesttoReplace() {
//   return this.eligibilityForm.get('RequesttoReplace');
// }
// get FlDlNum() {
//   return this.eligibilityForm.get('FlDlNum');
// }
// get SsnLast4() {
//   return this.eligibilityForm.get('SsnLast4');
// }
// get DlIssueDate() {
//   return this.eligibilityForm.get('DlIssueDate');
// }
// get LastName() {
//   return this.eligibilityForm.get('LastName');
// }
// get Firstname() {
//   return this.eligibilityForm.get('Firstname');
// }
// get MiddleName() {
//   return this.eligibilityForm.get('MiddleName');
// }
// get NameSuffix() {
//   return this.eligibilityForm.get('NameSuffix');
// }
saveEligibility() {
//  const eligibility = {id: '3', UsCitizen: 'true',
//  NotAFelon: 'false', MentalIncompStatus: 'false', NewRegistration: 'true', RecordUpdate: 'true',
//  RequesttoReplace: 'false', FlDlNum: 'A1234569879', SsnLast4: '7894', DlIssueDate: '12/12/2007',
//  LastName: 'LastName', Firstname: 'FirstName', MiddleName: 'MiddleName', NameSuffix: 'Mr', DateOfBirth: '12/12/1981'};
// const eligibility = {id: '3', UsCitizen: 'true',
//  NotAFelon: 'false', MentalIncompStatus: 'false', NewRegistration: 'true', RecordUpdate: 'true',
//  RequesttoReplace: 'false', FlDlNum: 'A1234569879', SsnLast4: '7894',
//  LastName: 'LastName', Firstname: 'FirstName', MiddleName: 'MiddleName', NameSuffix: 'Mr'};
 const eligibility = this.eligibilityForm.value;
     this.eligibilityService.postEligibility(eligibility).subscribe(res => {
          const eligi: IEligibility = res.body;
          this.loadAllEligibilitys();
        },
(err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
          }
        }
     );
}

}
