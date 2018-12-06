using System;
using System.ComponentModel.DataAnnotations;

namespace OvrApp.API.Models
{
    public class Eligibility
    {
        [Key]
        public long OvrApplicationId { get; set; }

        [MaxLength(40)]
        public string SessionId { get; set; }

        public bool UsCitizen { get; set; }


        public bool NotAFelon { get; set; }

        public bool MentalIncompStatus { get; set; }

        [MaxLength(30)]
        public string LastName { get; set; }

        [MaxLength(30)]
        public string FirstName { get; set; }

        [MaxLength(30)]
        public string MiddleName { get; set; }

        [MaxLength(5)]
        public string NameSuffix { get; set; }


        [MaxLength(13)]
        public string FlDlNum { get; set; }

        public DateTime? DlIssueDate { get; set; }

        [MaxLength(4)]
        public string SsnLast4 { get; set; }

        public bool? VoterClaimsNoSsnOrDln { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public Int32? ApplicationType { get; set; }

        public bool? NewRegistration { get; set; }

        public bool? RecordUpdate { get; set; }

        public bool? RequesttoReplace { get; set; }
    }
}