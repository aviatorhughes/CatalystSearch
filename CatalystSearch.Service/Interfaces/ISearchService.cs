using CatalystSearch.Service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Service.Interfaces
{
    public interface ISearchService
    {
        IEnumerable<PersonResultEntity> GetSearchResults(string searchText);
        void SavePerson(PersonResultEntity person);
    }
}
