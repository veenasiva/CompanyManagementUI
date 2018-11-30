using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CompanyManagement.Models
{
    public partial class DuplicateCompanyResult
    {
        public int Count { get; set; }
        public string CompanyName { get; set; }
    }
}