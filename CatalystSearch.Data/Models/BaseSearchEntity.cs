using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatalystSearch.Data.Models
{
    public abstract class BaseSearchEntity : ISearchEntity
    {
        public int CreatedById { get; set; }

        public DateTime CreatedOn { get; set; }

        public bool IsActive { get; set; }

        public int ModifiedById { get; set; }

        public DateTime ModifiedOn { get; set; }
    }
}