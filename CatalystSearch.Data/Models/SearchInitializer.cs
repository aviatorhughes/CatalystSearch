using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CatalystSearch.Data.Models
{
    public class SearchInitializer : DropCreateDatabaseAlways<SearchContext>
    {
        protected override void Seed(SearchContext context)
        {
            //Seeding test data 
            var people = new List<Person>
            {
                new Person { FirstName = "Tony", LastName="Lee", Age=21, Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests="gaming, playing volley ball" },
                new Person { FirstName = "Jimmy", LastName="Smith",Age=19, Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests = "football, racing cars"},
                new Person { FirstName = "Brandee", LastName="Burjansky", Age=56,Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests ="Nintendo, Xbox, Netflix" },
                new Person { FirstName = "Stephanie", LastName="Kim", Age=39,Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests = "" },
                new Person { FirstName = "Arnold", LastName="Schwartz", Age=44,Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests = "Swimming, racquet ball, tennis" }
            };

            people.ForEach(p =>
            {
                p.CreatedById = p.ModifiedById = -1;
                p.CreatedOn = p.ModifiedOn = DateTime.UtcNow;
                p.IsActive = true;

                context.People.Add(p);
            });

            context.SaveChanges();
        }
    }
}