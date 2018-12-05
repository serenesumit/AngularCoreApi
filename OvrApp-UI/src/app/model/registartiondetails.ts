export interface IRegistartiondetails {
    ovrApplicationId: number;
    gender: string;
    raceId: number;
    publicEmailAddress: string;
     emailConfirmation: string;
      requestSampleBallotByEmail: boolean;
    daytimeAreaCode: string;
     daytimePhone: string;
    daytimePhoneExtension: string;
    voterClaimsNoSsnOrDln?: boolean;
  resStreetNumber?: number;
    resStreetNumberSuffix: string;
   resStreetPreDirection: string;

     resStreetName: string;
     resStreetType: string;
    resStreetPostDirection: string;
   resUnitType: string;
     resUnitNumber: string;

    resUspsCityName: string;
  resZipCode: string;

    resZipCodePlus4: string;
     countyOfResidence: string;

    mailingAddSameAsResi?: boolean;
     mailAddrLine1: string;

    mailAddrLine2: string;

     mailAddrLine3: string;
 mailAddrCity: string;
 mailAddrZip: string;
 mailAddrState: string;
 mailAddrCountry: string;
formerAddrLine1: string;
 formerAddrLine2: string;
 fromerAddrLine3: string;


  formerAddrCity: string;
 formerAddrZip: string;

    formerAddrState: string;

formerAddrCountry: string;

formerFirstName: string;

  formerLastName: string;


   formerMiddleName: string;

   placeOfBirth: string;


    partyAffiliation: string;

    votingAssistRequired?: boolean;

  pollWorkerVolunteer?: boolean;

   military?: boolean;

  militaryDependent?: boolean;

  overseasFlag ?: boolean;

   fvrsStreetSegmentId?: number;

     regDate: string;

   hashcode: string;

    oVRStatus?: number;

   createdTs?: Date;

 lastModifiedTs?: Date;

 submittedTs?: Date;
     clientId: string;

    clientAttribute: string;

     webBrowser: string;

     browserVersion: string;

   referralSourceType: string;

   referralSourceId: string;

    referralCampaign: string;

hsmvMatchStatus?: number;

  hsmvMatchId?: number;

   hsmvMatchDatetime?: Date;

  transferID: string;
  hSMVRetries?: number;
 isManualAddress ?: boolean;
  applicationType?: number;
newRegistration?: boolean;
 recordUpdate?: boolean;
  requesttoReplace?: boolean;
  hsmvMatchSignatureDate?: Date;
  currentTabId: number;
}