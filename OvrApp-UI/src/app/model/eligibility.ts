export interface IEligibility {
  OvrApplicationId: number;
  UsCitizen: boolean;
  NotAFelon: boolean;
  MentalIncompStatus: boolean;
  NewRegistration: boolean;
  RecordUpdate: boolean;
  RequesttoReplace: boolean;
  FlDlNum: string;
  SsnLast4: string;
  FirstName :string;
  DlIssueDate: string;
  LastName: string;  
  MiddleName: string;
  NameSuffix: string;
   DateOfBirth: string;   
 // DateOfBirth: Date;

  currentTabId:number;
}

export class CommonSetting{
  static RecaptaSiteKey:string = '6Lc19nkUAAAAAGZeKmnuZXeW_uIJ2fDXVAuk8JCd'
}