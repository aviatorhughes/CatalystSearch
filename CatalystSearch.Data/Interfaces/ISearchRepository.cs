using CatalystSearch.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Data.Interfaces
{
    public interface ISearchRepository
    {
        IEnumerable<Person> GetPeople(string name);
    }
}
