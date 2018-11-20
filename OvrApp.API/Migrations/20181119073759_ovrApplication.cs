using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OvrApp.API.Migrations
{
    public partial class ovrApplication : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OvrApplications",
                columns: table => new
                {
                    OvrApplicationId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SessionId = table.Column<string>(nullable: true),
                    UsCitizen = table.Column<bool>(nullable: false),
                    NotAFelon = table.Column<bool>(nullable: false),
                    MentalIncompStatus = table.Column<bool>(nullable: false),
                    LastName = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    MiddleName = table.Column<string>(nullable: true),
                    NameSuffix = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    RaceId = table.Column<int>(nullable: false),
                    PublicEmailAddress = table.Column<string>(nullable: true),
                    EmailConfirmation = table.Column<string>(nullable: true),
                    RequestSampleBallotByEmail = table.Column<bool>(nullable: true),
                    DaytimeAreaCode = table.Column<string>(nullable: true),
                    DaytimePhone = table.Column<string>(nullable: true),
                    DaytimePhoneExtension = table.Column<string>(nullable: true),
                    FlDlNum = table.Column<string>(nullable: true),
                    DlIssueDate = table.Column<DateTime>(nullable: true),
                    SsnLast4 = table.Column<string>(nullable: true),
                    VoterClaimsNoSsnOrDln = table.Column<bool>(nullable: true),
                    ResStreetNumber = table.Column<long>(nullable: true),
                    ResStreetNumberSuffix = table.Column<string>(nullable: true),
                    ResStreetPreDirection = table.Column<string>(nullable: true),
                    ResStreetName = table.Column<string>(nullable: true),
                    ResStreetType = table.Column<string>(nullable: true),
                    ResStreetPostDirection = table.Column<string>(nullable: true),
                    ResUnitType = table.Column<string>(nullable: true),
                    ResUnitNumber = table.Column<string>(nullable: true),
                    ResUspsCityName = table.Column<string>(nullable: true),
                    ResZipCode = table.Column<string>(nullable: true),
                    ResZipCodePlus4 = table.Column<string>(nullable: true),
                    CountyOfResidence = table.Column<string>(nullable: true),
                    MailingAddSameAsResi = table.Column<bool>(nullable: true),
                    MailAddrLine1 = table.Column<string>(nullable: true),
                    MailAddrLine2 = table.Column<string>(nullable: true),
                    MailAddrLine3 = table.Column<string>(nullable: true),
                    MailAddrCity = table.Column<string>(nullable: true),
                    MailAddrZip = table.Column<string>(nullable: true),
                    MailAddrState = table.Column<string>(nullable: true),
                    MailAddrCountry = table.Column<string>(nullable: true),
                    FormerAddrLine1 = table.Column<string>(nullable: true),
                    FormerAddrLine2 = table.Column<string>(nullable: true),
                    FromerAddrLine3 = table.Column<string>(nullable: true),
                    FormerAddrCity = table.Column<string>(nullable: true),
                    FormerAddrZip = table.Column<string>(nullable: true),
                    FormerAddrState = table.Column<string>(nullable: true),
                    FormerAddrCountry = table.Column<string>(nullable: true),
                    FormerFirstName = table.Column<string>(nullable: true),
                    FormerLastName = table.Column<string>(nullable: true),
                    FormerMiddleName = table.Column<string>(nullable: true),
                    PlaceOfBirth = table.Column<string>(nullable: true),
                    PartyAffiliation = table.Column<string>(nullable: true),
                    VotingAssistRequired = table.Column<bool>(nullable: true),
                    PollWorkerVolunteer = table.Column<bool>(nullable: true),
                    Military = table.Column<bool>(nullable: true),
                    MilitaryDependent = table.Column<bool>(nullable: true),
                    OverseasFlag = table.Column<bool>(nullable: true),
                    FvrsStreetSegmentId = table.Column<long>(nullable: true),
                    RegDate = table.Column<DateTime>(nullable: true),
                    Hashcode = table.Column<string>(nullable: true),
                    OVRStatus = table.Column<int>(nullable: true),
                    CreatedTs = table.Column<DateTime>(nullable: true),
                    LastModifiedTs = table.Column<DateTime>(nullable: true),
                    SubmittedTs = table.Column<DateTime>(nullable: true),
                    ClientId = table.Column<string>(nullable: true),
                    ClientAttribute = table.Column<string>(nullable: true),
                    WebBrowser = table.Column<string>(nullable: true),
                    BrowserVersion = table.Column<string>(nullable: true),
                    ReferralSourceType = table.Column<string>(nullable: true),
                    ReferralSourceId = table.Column<string>(nullable: true),
                    ReferralCampaign = table.Column<string>(nullable: true),
                    HsmvMatchStatus = table.Column<short>(nullable: true),
                    HsmvMatchId = table.Column<long>(nullable: true),
                    HsmvMatchDatetime = table.Column<DateTime>(nullable: true),
                    TransferID = table.Column<string>(nullable: true),
                    HSMVRetries = table.Column<int>(nullable: true),
                    IsManualAddress = table.Column<bool>(nullable: true),
                    ApplicationType = table.Column<int>(nullable: true),
                    NewRegistration = table.Column<bool>(nullable: true),
                    RecordUpdate = table.Column<bool>(nullable: true),
                    RequesttoReplace = table.Column<bool>(nullable: true),
                    HsmvMatchSignatureDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OvrApplications", x => x.OvrApplicationId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OvrApplications");
        }
    }
}
