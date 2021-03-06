﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OvrApp.API.Data;

namespace OvrApp.API.Migrations
{
    [DbContext(typeof(OvrAppContext))]
    [Migration("20181119073759_ovrApplication")]
    partial class ovrApplication
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("OvrApp.API.Models.Eligibility", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DLNumber");

                    b.Property<DateTime?>("Dob");

                    b.Property<string>("Firstname");

                    b.Property<string>("IsCitizen");

                    b.Property<string>("IsFelon");

                    b.Property<string>("IsMentalIncomp");

                    b.Property<DateTime?>("IssueDate");

                    b.Property<string>("LastName");

                    b.Property<string>("LastSSN");

                    b.Property<string>("MiddleName");

                    b.Property<bool>("NewRegistration");

                    b.Property<bool>("RecordUpdate");

                    b.Property<bool>("RequesttoReplace");

                    b.Property<string>("Suffix");

                    b.HasKey("Id");

                    b.ToTable("Eligibilitys");
                });

            modelBuilder.Entity("OvrApp.API.Models.OvrApplication", b =>
                {
                    b.Property<long>("OvrApplicationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ApplicationType");

                    b.Property<string>("BrowserVersion");

                    b.Property<string>("ClientAttribute");

                    b.Property<string>("ClientId");

                    b.Property<string>("CountyOfResidence");

                    b.Property<DateTime?>("CreatedTs");

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<string>("DaytimeAreaCode");

                    b.Property<string>("DaytimePhone");

                    b.Property<string>("DaytimePhoneExtension");

                    b.Property<DateTime?>("DlIssueDate");

                    b.Property<string>("EmailConfirmation");

                    b.Property<string>("FirstName");

                    b.Property<string>("FlDlNum");

                    b.Property<string>("FormerAddrCity");

                    b.Property<string>("FormerAddrCountry");

                    b.Property<string>("FormerAddrLine1");

                    b.Property<string>("FormerAddrLine2");

                    b.Property<string>("FormerAddrState");

                    b.Property<string>("FormerAddrZip");

                    b.Property<string>("FormerFirstName");

                    b.Property<string>("FormerLastName");

                    b.Property<string>("FormerMiddleName");

                    b.Property<string>("FromerAddrLine3");

                    b.Property<long?>("FvrsStreetSegmentId");

                    b.Property<string>("Gender");

                    b.Property<int?>("HSMVRetries");

                    b.Property<string>("Hashcode");

                    b.Property<DateTime?>("HsmvMatchDatetime");

                    b.Property<long?>("HsmvMatchId");

                    b.Property<DateTime?>("HsmvMatchSignatureDate");

                    b.Property<short?>("HsmvMatchStatus");

                    b.Property<bool?>("IsManualAddress");

                    b.Property<DateTime?>("LastModifiedTs");

                    b.Property<string>("LastName");

                    b.Property<string>("MailAddrCity");

                    b.Property<string>("MailAddrCountry");

                    b.Property<string>("MailAddrLine1");

                    b.Property<string>("MailAddrLine2");

                    b.Property<string>("MailAddrLine3");

                    b.Property<string>("MailAddrState");

                    b.Property<string>("MailAddrZip");

                    b.Property<bool?>("MailingAddSameAsResi");

                    b.Property<bool>("MentalIncompStatus");

                    b.Property<string>("MiddleName");

                    b.Property<bool?>("Military");

                    b.Property<bool?>("MilitaryDependent");

                    b.Property<string>("NameSuffix");

                    b.Property<bool?>("NewRegistration");

                    b.Property<bool>("NotAFelon");

                    b.Property<int?>("OVRStatus");

                    b.Property<bool?>("OverseasFlag");

                    b.Property<string>("PartyAffiliation");

                    b.Property<string>("PlaceOfBirth");

                    b.Property<bool?>("PollWorkerVolunteer");

                    b.Property<string>("PublicEmailAddress");

                    b.Property<int>("RaceId");

                    b.Property<bool?>("RecordUpdate");

                    b.Property<string>("ReferralCampaign");

                    b.Property<string>("ReferralSourceId");

                    b.Property<string>("ReferralSourceType");

                    b.Property<DateTime?>("RegDate");

                    b.Property<bool?>("RequestSampleBallotByEmail");

                    b.Property<bool?>("RequesttoReplace");

                    b.Property<string>("ResStreetName");

                    b.Property<long?>("ResStreetNumber");

                    b.Property<string>("ResStreetNumberSuffix");

                    b.Property<string>("ResStreetPostDirection");

                    b.Property<string>("ResStreetPreDirection");

                    b.Property<string>("ResStreetType");

                    b.Property<string>("ResUnitNumber");

                    b.Property<string>("ResUnitType");

                    b.Property<string>("ResUspsCityName");

                    b.Property<string>("ResZipCode");

                    b.Property<string>("ResZipCodePlus4");

                    b.Property<string>("SessionId");

                    b.Property<string>("SsnLast4");

                    b.Property<DateTime?>("SubmittedTs");

                    b.Property<string>("TransferID");

                    b.Property<bool>("UsCitizen");

                    b.Property<bool?>("VoterClaimsNoSsnOrDln");

                    b.Property<bool?>("VotingAssistRequired");

                    b.Property<string>("WebBrowser");

                    b.HasKey("OvrApplicationId");

                    b.ToTable("OvrApplications");
                });
#pragma warning restore 612, 618
        }
    }
}
