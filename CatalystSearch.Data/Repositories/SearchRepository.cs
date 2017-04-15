using CatalystSearch.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatalystSearch.Data.Models;

namespace CatalystSearch.Data.Repositories
{
    public class SearchRepository : ISearchRepository
    {
        #region Public Properties
        public SearchContext SearchContext { get; set; }
        #endregion

        #region Construction

        public SearchRepository(SearchContext searchContext)
        {
            SearchContext = searchContext;
        }

        #endregion

        #region Public Methods

        public IEnumerable<Person> GetPeople(string name)
        {
            //name can be part of first name or last name. 
            var results = SearchContext.People.Where(p => p.FirstName.ToLower().Contains(name.ToLower()) || p.LastName.ToLower().Contains(name.ToLower()));

            return results; 
        }

        #endregion
    }
}
