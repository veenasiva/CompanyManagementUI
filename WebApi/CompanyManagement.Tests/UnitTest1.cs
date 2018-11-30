using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http;
using System.Web.Http.Results;
using CompanyManagement.Repository;
using CompanyManagement.Controllers;
using CompanyManagement.Models;
using Moq;

namespace CompanyManagement.Tests
{
    [TestClass]
    public class UnitTest1
    {
        private Mock<ICompanyRepository> _companyRepository;
        private CompaniesController controller;
        List<Company> lstCompany;
        [TestInitialize]
        public void Initialize()
        {
            _companyRepository = new Mock<ICompanyRepository>();
            controller = new CompaniesController(_companyRepository.Object);

            lstCompany = new List<Company>()
            {
                new Company(){CompanyID=1,CompanyName="ABC",CompanyEmail="a@a.com",CompanyPhone="1234546"},
                new Company(){CompanyID=2,CompanyName="ABC1",CompanyEmail="a1@a.com",CompanyPhone="2234546"},
                new Company(){CompanyID=3,CompanyName="ABC2",CompanyEmail="a2@a.com",CompanyPhone="3234546"}
            };

        }

        [TestMethod]
        public void GetAllCompany_ShouldReturnAllCompany()
        {
           
            _companyRepository.Setup(x => x.GetAll()).Returns(lstCompany.AsQueryable<Company>());

            //Act
            var result = controller.GetCompanies();

            //Assert
            Assert.AreEqual(result.Count(), lstCompany.Count());

        }
        [TestMethod]
        public void GetCompany_ShouldReturnCompany()
        {

            _companyRepository.Setup(x => x.Get(It.IsAny<int>())).Returns(new Func<int, Company>( CompanyID => lstCompany.Find(p => p.CompanyID.Equals(CompanyID))));
            
            //Act
            var result = controller.GetCompany(1);
            var company=result as OkNegotiatedContentResult<Company>;
            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(lstCompany[0].CompanyName, company.Content.CompanyName);

        }

        [TestMethod]
        public void AddCompanyTest()
        {
            //_companyRepository.Setup(x => x.Add(It.IsAny<Company>())).Returns(new Func<int, Company>(CompanyID => lstCompany.Find(p => p.CompanyID.Equals(CompanyID))));
            var newcompany = new Company { CompanyID = 4, CompanyName = "test", CompanyEmail = "a@a.com", CompanyPhone = "1111111",IsDuplicate=false };
            _companyRepository.Setup(x => x.Add((It.IsAny<Company>())))
            .Callback(new Action<Company>(newCompany =>
            {
                lstCompany.Add(newCompany);
            }));

           
            var result = controller.PostCompany(newcompany);

            var response = result as CreatedAtRouteNegotiatedContentResult<Company>;
            Assert.AreEqual("DefaultApi", response.RouteName);
        }



    }
   
}
