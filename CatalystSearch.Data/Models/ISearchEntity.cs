using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Data.Models
{
    public interface ISearchEntity
    {
        int CreatedById { get; set; }
        int ModifiedById { get; set; }
        DateTime CreatedOn { get; set; }
        DateTime ModifiedOn { get; set; }
        bool IsActive { get; set; }
    }
}
