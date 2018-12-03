using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OvrApp.API.Data;
using OvrApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OvrApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OvrAppController : Controller
    {
        private readonly OvrAppContext _context;
        private IMapper _mapper;

        // initiate database context
        public OvrAppController(OvrAppContext context,
               IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("getAllEligibility")]
        public IEnumerable<OvrApplication> GetAll()
        {
            // fetch all contact records 
            return _context.OvrApplications.ToList();
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetById(long id)
        {
            // filter contact records by contact id
            var item = this.GetOvrApplicationById(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        // [Route("addEligibility")]
        public async Task<IActionResult> CreateEligibility([FromBody] OvrApplication item)
        {
            // set bad request if contact data is not provided in body
            if (item == null)
            {
                return BadRequest();
            }

            var dbOvrApplication = _mapper.Map<OvrApplication>(item);
            dbOvrApplication.SessionId = Guid.NewGuid().ToString();
            await _context.OvrApplications.AddAsync(dbOvrApplication);
            await _context.SaveChangesAsync();
            var data = GetOvrApplicationById(dbOvrApplication.OvrApplicationId);
            return new ObjectResult(data);
        }


        [HttpPut]
        [Route("{id:int}/eligibility")]
        public async Task<IActionResult> UpdateEligibility(long id, [FromBody] OvrApplication model)
        {
            // set bad request if contact data is not provided in body
            if (id == 0 || id != model.OvrApplicationId)
            {
                return BadRequest();
            }

            var dbOvrApplication = this.GetOvrApplicationById(id);
            if (dbOvrApplication == null || model == null)
            {
                return NotFound();
            }

            dbOvrApplication.UsCitizen = model.UsCitizen;
            dbOvrApplication.NotAFelon = model.NotAFelon;
            dbOvrApplication.MentalIncompStatus = model.MentalIncompStatus;
            dbOvrApplication.NewRegistration = model.NewRegistration;
            dbOvrApplication.RecordUpdate = model.RecordUpdate;
            dbOvrApplication.RequesttoReplace = model.RequesttoReplace;
            dbOvrApplication.FlDlNum = model.FlDlNum;
            dbOvrApplication.SsnLast4 = model.SsnLast4;
            dbOvrApplication.DlIssueDate = model.DlIssueDate;
            dbOvrApplication.LastName = model.LastName;
            dbOvrApplication.FirstName = model.FirstName;
            dbOvrApplication.MiddleName = model.MiddleName;
            dbOvrApplication.NameSuffix = model.NameSuffix;
            dbOvrApplication.DateOfBirth = model.DateOfBirth;
            _context.Update(dbOvrApplication);
            await _context.SaveChangesAsync();

            return new ObjectResult(GetOvrApplicationById(dbOvrApplication.OvrApplicationId));
        }


        [HttpPut]
        [Route("{id:int}/registerDetails")]
        public async Task<IActionResult> RegisterDetail(long id, [FromBody] RegisterDetailsModel model)
        {
            // set bad request if contact data is not provided in body
            if (id == 0 || id != model.OvrApplicationId)
            {
                return BadRequest();
            }

            var dbOvrApplication = this.GetOvrApplicationById(id);
            if (dbOvrApplication == null || model == null)
            {
                return NotFound();
            }
            try
            {

                dbOvrApplication.Gender = model.Gender;
                dbOvrApplication.RaceId = model.RaceId;
                dbOvrApplication.PublicEmailAddress = model.PublicEmailAddress;
                dbOvrApplication.EmailConfirmation = model.EmailConfirmation;
                dbOvrApplication.RequestSampleBallotByEmail = model.RequestSampleBallotByEmail;
                dbOvrApplication.DaytimeAreaCode = model.DaytimeAreaCode;
                dbOvrApplication.DaytimePhone = model.DaytimePhone;
                dbOvrApplication.DaytimePhoneExtension = model.DaytimePhoneExtension;
                dbOvrApplication.VoterClaimsNoSsnOrDln = model.VoterClaimsNoSsnOrDln;
                dbOvrApplication.ResStreetNumber = model.ResStreetNumber;
                dbOvrApplication.ResStreetNumberSuffix = model.ResStreetNumberSuffix;
                dbOvrApplication.ResStreetPreDirection = model.ResStreetPreDirection;
                dbOvrApplication.ResStreetName = model.ResStreetName;
                dbOvrApplication.ResStreetType = model.ResStreetType;
                dbOvrApplication.ResStreetPostDirection = model.ResStreetPostDirection;
                dbOvrApplication.ResUnitType = model.ResUnitType;
                dbOvrApplication.ResUnitNumber = model.ResUnitNumber;
                dbOvrApplication.ResUspsCityName = model.ResUspsCityName;
                dbOvrApplication.ResZipCode = model.ResZipCode;
                dbOvrApplication.ResZipCodePlus4 = model.ResZipCodePlus4;
                dbOvrApplication.CountyOfResidence = model.CountyOfResidence;
                dbOvrApplication.MailingAddSameAsResi = model.MailingAddSameAsResi;
                dbOvrApplication.MailAddrLine1 = model.MailAddrLine1;
                dbOvrApplication.MailAddrLine2 = model.MailAddrLine2;
                dbOvrApplication.MailAddrLine3 = model.MailAddrLine3;
                dbOvrApplication.MailAddrCity = model.MailAddrCity;
                dbOvrApplication.MailAddrZip = model.MailAddrZip;
                dbOvrApplication.MailAddrState = model.MailAddrState;
                dbOvrApplication.MailAddrCountry = model.MailAddrCountry;
                dbOvrApplication.FormerAddrLine1 = model.FormerAddrLine1;
                dbOvrApplication.FormerAddrLine2 = model.FormerAddrLine2;
                dbOvrApplication.FromerAddrLine3 = model.FromerAddrLine3;
                dbOvrApplication.FormerAddrCity = model.FormerAddrCity;
                dbOvrApplication.FormerAddrZip = model.FormerAddrZip;
                dbOvrApplication.FormerAddrState = model.FormerAddrState;
                dbOvrApplication.FormerAddrCountry = model.FormerAddrCountry;
                dbOvrApplication.FormerFirstName = model.FormerFirstName;
                dbOvrApplication.FormerLastName = model.FormerLastName;


                dbOvrApplication.FormerMiddleName = model.FormerMiddleName;
                dbOvrApplication.PlaceOfBirth = model.PlaceOfBirth;
                dbOvrApplication.PartyAffiliation = model.PartyAffiliation;
                dbOvrApplication.VotingAssistRequired = model.VotingAssistRequired;
                dbOvrApplication.PollWorkerVolunteer = model.PollWorkerVolunteer;
                dbOvrApplication.Military = model.Military;
                dbOvrApplication.MilitaryDependent = model.MilitaryDependent;
                dbOvrApplication.OverseasFlag = model.OverseasFlag;
                dbOvrApplication.FvrsStreetSegmentId = model.FvrsStreetSegmentId;
                dbOvrApplication.RegDate = model.RegDate;
                dbOvrApplication.Hashcode = model.Hashcode;
                dbOvrApplication.OVRStatus = model.OVRStatus;

                dbOvrApplication.PartyAffiliation = "FDP";

                _context.Update(dbOvrApplication);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

            }


            return new ObjectResult(GetOvrApplicationById(dbOvrApplication.OvrApplicationId));
        }




        private OvrApplication GetOvrApplicationById(long id)
        {
            return _context.OvrApplications.AsNoTracking().FirstOrDefault(t => t.OvrApplicationId == id);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}