using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using CompanyManagement.Models;
using CompanyManagement.Repository;


namespace CompanyManagement.Controllers
{
    public class CompaniesController : ApiController
    {
        private ICompanyRepository _companyRepository;
        public CompaniesController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }

        // GET: api/Companies
        public IEnumerable<Company> GetCompanies()
        {
            return _companyRepository.GetAll();
        }

        // GET: api/Companies/5
        [ResponseType(typeof(Company))]
        public IHttpActionResult GetCompany(int id)
        {
            Company company = _companyRepository.Get(id);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }



        // PUT: api/Companies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompany(int id, Company company)
        {
            
            if (id != company.CompanyID)
            {
                return BadRequest();
            }
            bool companyExists;
            if (company.IsDuplicate)
                companyExists = _companyRepository.GetAll().Any(x => x.CompanyName == company.CompanyName );
            else
                companyExists = _companyRepository.GetAll().Any(
                    x => x.CompanyEmail == company.CompanyEmail || x.CompanyPhone == company.CompanyPhone);

            if (companyExists)
            {
                ModelState.AddModelError("Error", "This Company  Already Exists.");
            }
            if (ModelState.IsValid)
            {
                //If no error update values
                try { 
                _companyRepository.Update(company);
                return StatusCode(HttpStatusCode.NoContent);
                }
                catch (Exception ex)
                {
                    return BadRequest("Failed During Company Update. Error: " + ex.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
           
        }

       // POST: api/Companies
       [ResponseType(typeof(Company))]
        public IHttpActionResult PostCompany(Company company)
        {
            bool companyExists = _companyRepository.GetAll().Any(
                    x => x.CompanyEmail == company.CompanyEmail || x.CompanyPhone == company.CompanyPhone);
            if (companyExists)
            {
                ModelState.AddModelError("Error", "This Company Already Exists.");
            }
            if (ModelState.IsValid)
            {
                try { 
                    _companyRepository.Add(company);
                    return CreatedAtRoute("DefaultApi", new { id = company.CompanyID }, company);
                }
                catch (Exception ex)
                {
                    return BadRequest("Failed During Company Creation. Error: " + ex.Message);
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
         }

        // DELETE: api/Companies/5
        [ResponseType(typeof(Company))]
        public IHttpActionResult DeleteCompany(int id)
        {
            _companyRepository.Delete(id);

            return Ok();
        }

        // GET: api/Companies/duplicates
        [HttpGet]
        [Route("api/companies/duplicates")]
        public IQueryable<DuplicateCompanyResult> GetDuplicateCompanies()
        {
            return _companyRepository.GetDuplicateCompanies();

        }

        [HttpGet]
        [Route("api/companies/duplicates/{name}")]
        [ResponseType(typeof(Company))]
        public IHttpActionResult GetDuplicateCompany(string name)
        {
            Company company = _companyRepository.GetDuplicateCompany(name);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }
 
    }
}