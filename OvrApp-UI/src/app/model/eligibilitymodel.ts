export interface IEligibilityModel {
  ovrApplicationId: number;

     sessionId: string;

    usCitizen: boolean;
     notAFelon: boolean;

    mentalIncompStatus: boolean;
    lastName: string;


    firstName: string;

   middleName: string;


   nameSuffix: string;

   dateOfBirth: string;

     flDlNum: string;

  dlIssueDate: string;


   ssnLast4: string;

   newRegistration?: boolean;

 recordUpdate?: boolean;

  requesttoReplace?: boolean;

  voterClaimsNoSsnOrDln?: boolean;

}