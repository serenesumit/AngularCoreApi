import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EligibilityService } from 'src/app/services/eligibility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/shared/Global';
import { IEligibility } from 'src/app/model/eligibility';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  editData:IEligibility;
  constructor() { }

  ngOnInit() {
    
  }

}
