using System;
using System.ComponentModel.DataAnnotations;

namespace OvrApp.API.Models
{
    public class RegisterDetailsModel
    {
        public long OvrApplicationId { get; set; }

        [MaxLength(1)]
        public string Gender { get; set; }

        public Int32 RaceId { get; set; }

        [MaxLength(100)]
        public string PublicEmailAddress { get; set; }

        [MaxLength(100)]
        public string EmailConfirmation { get; set; }

        public bool? RequestSampleBallotByEmail { get; set; }

        [MaxLength(3)]
        public string DaytimeAreaCode { get; set; }

        [MaxLength(7)]
        public string DaytimePhone { get; set; }

        [MaxLength(5)]
        public string DaytimePhoneExtension { get; set; }



        public bool? VoterClaimsNoSsnOrDln { get; set; }


        public Int64? ResStreetNumber { get; set; }

        [MaxLength(4)]
        public string ResStreetNumberSuffix { get; set; }

        [MaxLength(2)]
        public string ResStreetPreDirection { get; set; }

        [MaxLength(45)]
        public string ResStreetName { get; set; }

        [MaxLength(4)]
        public string ResStreetType { get; set; }

        [MaxLength(2)]
        public string ResStreetPostDirection { get; set; }

        [MaxLength(6)]
        public string ResUnitType { get; set; }

        [MaxLength(20)]
        public string ResUnitNumber { get; set; }

        [MaxLength(40)]
        public string ResUspsCityName { get; set; }

        [MaxLength(5)]
        public string ResZipCode { get; set; }

        [MaxLength(4)]
        public string ResZipCodePlus4 { get; set; }

        [MaxLength(3)]
        public string CountyOfResidence { get; set; }

        public bool? MailingAddSameAsResi { get; set; }

        [MaxLength(40)]
        public string MailAddrLine1 { get; set; }

        [MaxLength(40)]
        public string MailAddrLine2 { get; set; }

        [MaxLength(40)]
        public string MailAddrLine3 { get; set; }

        [MaxLength(40)]
        public string MailAddrCity { get; set; }

        [MaxLength(15)]
        public string MailAddrZip { get; set; }

        [MaxLength(2)]
        public string MailAddrState { get; set; }

        [MaxLength(25)]
        public string MailAddrCountry { get; set; }

        [MaxLength(40)]
        public string FormerAddrLine1 { get; set; }

        [MaxLength(40)]
        public string FormerAddrLine2 { get; set; }

        [MaxLength(40)]
        public string FromerAddrLine3 { get; set; }

        [MaxLength(40)]
        public string FormerAddrCity { get; set; }

        [MaxLength(15)]
        public string FormerAddrZip { get; set; }

        [MaxLength(2)]
        public string FormerAddrState { get; set; }

        [MaxLength(25)]
        public string FormerAddrCountry { get; set; }

        [MaxLength(29)]
        public string FormerFirstName { get; set; }

        [MaxLength(29)]
        public string FormerLastName { get; set; }

        [MaxLength(29)]
        public string FormerMiddleName { get; set; }

        [MaxLength(50)]
        public string PlaceOfBirth { get; set; }

       // [MaxLength(3)]
        public string PartyAffiliation { get; set; }

        public bool? VotingAssistRequired { get; set; }

        public bool? PollWorkerVolunteer { get; set; }

        public bool? Military { get; set; }

        public bool? MilitaryDependent { get; set; }

        public bool? OverseasFlag { get; set; }

        public Int64? FvrsStreetSegmentId { get; set; }

        public DateTime? RegDate { get; set; }

        public string Hashcode { get; set; }

        public Int32? OVRStatus { get; set; }

        public DateTime? CreatedTs { get; set; }

        public DateTime? LastModifiedTs { get; set; }

        public DateTime? SubmittedTs { get; set; }

        [MaxLength(40)]
        public string ClientId { get; set; }

        public string ClientAttribute { get; set; }

        public string WebBrowser { get; set; }

        [MaxLength(25)]
        public string BrowserVersion { get; set; }

        [MaxLength(10)]
        public string ReferralSourceType { get; set; }

        [MaxLength(10)]
        public string ReferralSourceId { get; set; }

        [MaxLength(25)]
        public string ReferralCampaign { get; set; }

        public Int16? HsmvMatchStatus { get; set; }

        public Int64? HsmvMatchId { get; set; }

        public DateTime? HsmvMatchDatetime { get; set; }

        [MaxLength(40)]
        public string TransferID { get; set; }

        public Int32? HSMVRetries { get; set; }

        public bool? IsManualAddress { get; set; }

        public Int32? ApplicationType { get; set; }

        public bool? NewRegistration { get; set; }

        public bool? RecordUpdate { get; set; }

        public bool? RequesttoReplace { get; set; }

        public DateTime? HsmvMatchSignatureDate { get; set; }
    }
}
