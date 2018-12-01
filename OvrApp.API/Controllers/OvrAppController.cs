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
            dbOvrApplication = _mapper.Map<OvrApplication>(model);

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
                dbOvrApplication = _mapper.Map<OvrApplication>(model);
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