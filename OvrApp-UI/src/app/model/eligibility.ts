export interface IEligibility {
  id: number;
  IsCitizen: string;
  IsFelon: string;
  IsMentalIncomp: string;
  NewRegistration: boolean;
  RecordUpdate: boolean;
  RequesttoReplace: boolean;
  DLNumber: string;
  LastSSN: string;
  FirstName :string;
  IssueDate: string;
  LastName: string;
  Firstname: string;
  MiddleName: string;
  Suffix: string;
   Dob: string;
 // Dob: Date;

  currentTabId:number;
}

export class CommonSetting{
  static RecaptaSiteKey:string = '6Lc19nkUAAAAAGZeKmnuZXeW_uIJ2fDXVAuk8JCd'
}