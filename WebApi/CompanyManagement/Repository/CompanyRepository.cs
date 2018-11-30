using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using CompanyManagement.Models;


namespace CompanyManagement.Repository
{
    public class CompanyRepository : ICompanyRepository
    {
        private CompanyManagementEntities db = new CompanyManagementEntities();
        public IQueryable<Company> GetAll()
        {
            return db.Companies.AsNoTracking();
           
        }

        public Company Get(int id)
        {
            return db.Companies.Where(c => c.CompanyID == id).FirstOrDefault();
        }

        public bool Update(Company company)
        {
            if (company == null)
            {
                throw new ArgumentNullException("company");
            }
            
            if (!CompanyExists(company.CompanyID))
            {
                
                return false;
            }
           
            try
            {
                db.Entry(company).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!CompanyExists(company.CompanyID))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
            return true;
        }

        public bool Add(Company company)
        {
            if (company == null)
            {
                throw new ArgumentNullException("company");
            }
            db.Companies.Add(company);
            db.SaveChanges();
            return true;
        }

        public bool Delete(int companyID)
        {
            if (companyID == 0)
            {
                throw new ArgumentNullException("companyID");
            }
            if (!CompanyExists(companyID))
            {
                return false;
            }
            db.Companies.Remove(db.Companies.Find(companyID));
            db.SaveChanges();

            return true;
        }

        public IQueryable<DuplicateCompanyResult> GetDuplicateCompanies()
        {
            return db.Companies.GroupBy(o => new { o.CompanyName })
                               .Select(g => new DuplicateCompanyResult { CompanyName = g.Key.CompanyName, Count = g.Count() })
                               .Where(x => x.Count > 1);
        }

        public Company GetDuplicateCompany(string companyName)
        {
            return db.Companies
                     .Where(c => c.CompanyName.Equals(companyName, StringComparison.CurrentCultureIgnoreCase))
                     .OrderByDescending(c => c.CompanyID)
                     .FirstOrDefault();
        }

        private bool CompanyExists(int id)
        {
            return db.Companies.Count(e => e.CompanyID == id) > 0;
        }

    }


}