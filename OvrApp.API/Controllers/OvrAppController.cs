using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OvrApp.API.Data;
using OvrApp.API.Models;

namespace OvrApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OvrAppController : Controller
    {
        private readonly OvrAppContext _context;

        // initiate database context
        public OvrAppController(OvrAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAllEligibility")]
        public IEnumerable<OvrApplication> GetAll()
        {
            // fetch all contact records 
            return _context.OvrApplications.ToList();
        }

        [HttpGet]
        [Route("getEligibility")]
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
        [Route("firstStep/addEligibility")]
        public IActionResult CreateEligibility([FromBody] OvrApplication item)
        {
            // set bad request if contact data is not provided in body
            if (item == null)
            {
                return BadRequest();
            }
            _context.OvrApplications.Add(new OvrApplication
            {
                UsCitizen = item.UsCitizen,
                NotAFelon = item.NotAFelon,
                MentalIncompStatus = item.MentalIncompStatus,
                NewRegistration = item.NewRegistration,
                RecordUpdate = item.RecordUpdate,
                RequesttoReplace = item.RequesttoReplace,
                FlDlNum = item.FlDlNum,
                SsnLast4 = item.SsnLast4,
                DlIssueDate = item.DlIssueDate,
                LastName = item.LastName,
                FirstName = item.FirstName,
                MiddleName = item.MiddleName,
                NameSuffix = item.NameSuffix,
                DateOfBirth = item.DateOfBirth
            });
            _context.SaveChanges();

            return Ok(new { message = "Eligibility is added successfully." });
        }



        [HttpPut]
        [Route("{id:int}/first/updateEligibility")]
        public IActionResult UpdateEligibility(long id, [FromBody] OvrApplication model)
        {
            // set bad request if contact data is not provided in body
            if (id == 0)
            {
                return BadRequest();
            }

            var dbOvrApplication = this.GetOvrApplicationById(id);
            if (dbOvrApplication == null)
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
            _context.SaveChanges();

            return Ok(new { message = "Eligibility is updated successfully." });
        }
        


        [HttpPut]
        [Route("{id:int}/second/updateEligibility")]
        public IActionResult UpdateSecondEligibility(long id, [FromBody] OvrApplication model)
        {
            // set bad request if contact data is not provided in body
            if (id == 0)
            {
                return BadRequest();
            }

            var dbOvrApplication = this.GetOvrApplicationById(id);
            if (dbOvrApplication == null)
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
            _context.SaveChanges();

            return Ok(new { message = "Eligibility is updated successfully." });
        }


        private OvrApplication GetOvrApplicationById(long id)
        {
            return _context.OvrApplications.FirstOrDefault(t => t.OvrApplicationId == id);
        }

    }
}