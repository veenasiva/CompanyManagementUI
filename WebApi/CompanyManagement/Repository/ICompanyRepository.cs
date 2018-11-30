using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CompanyManagement.Models;


namespace CompanyManagement.Repository
{
    public interface ICompanyRepository
    {
        IQueryable<Company> GetAll();
        Company Get(int companyID);
        bool Update(Company company);
        bool Add(Company company);
        bool Delete(int companyID);
        IQueryable<DuplicateCompanyResult> GetDuplicateCompanies();
        Company GetDuplicateCompany(string companyName);
    }
}
