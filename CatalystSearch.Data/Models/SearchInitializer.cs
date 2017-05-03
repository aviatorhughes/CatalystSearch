using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CatalystSearch.Data.Models
{
    public class SearchInitializer : DropCreateDatabaseIfModelChanges<SearchContext>
    {
        protected override void Seed(SearchContext context)
        {
            //Seeding test data 
            var people = new List<Person>
            {
                new Person { FirstName = "Tony", LastName="Lee", Age=21, Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests="gaming, playing volley ball" },
                new Person { FirstName = "Jimmy", LastName="Smith",Age=19, Street = "South St, Apt#155", City="Roseville", StateCd="CA", Zipcode="95747", Interests = "football, racing cars"},
                new Person { FirstName = "Brandee", LastName="Burjansky", Age=56,Street = "North St, Apt#54", City="Rancho Cordova", StateCd="CA", Zipcode="95140", Interests ="Nintendo, Xbox, Netflix" },
                new Person { FirstName = "Stephanie", LastName="Kim", Age=39,Street = "East St, Apt#23", City="Elk Grove", StateCd="CA", Zipcode="95847", Interests = "" },
                new Person { FirstName = "Arnold", LastName="Schwartz", Age=44,Street = "West St, Apt#99", City="Rocklin", StateCd="CA", Zipcode="95748", Interests = "Swimming, racquet ball, tennis" },
                
                new Person { FirstName = "James", LastName="John", Age=21, Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests="gaming, playing volley ball" },
                new Person { FirstName = "Tiffany", LastName="Dural",Age=19, Street = "South St, Apt#155", City="Roseville", StateCd="CA", Zipcode="95747", Interests = "football, racing cars"},
                new Person { FirstName = "Brad", LastName="Pat", Age=56,Street = "North St, Apt#54", City="Rancho Cordova", StateCd="CA", Zipcode="95140", Interests ="Nintendo, Xbox, Netflix" },
                new Person { FirstName = "Leo", LastName="Rider", Age=39,Street = "East St, Apt#23", City="Elk Grove", StateCd="CA", Zipcode="95847", Interests = "" },
                new Person { FirstName = "Jim", LastName="Shim", Age=44,Street = "West St, Apt#99", City="Rocklin", StateCd="CA", Zipcode="95748", Interests = "Swimming, racquet ball, tennis" },

                new Person { FirstName = "Angela", LastName="Davis", Age=21, Street = "Main St, Apt#123", City="Fresno", StateCd="CA", Zipcode="95123", Interests="gaming, playing volley ball" },
                new Person { FirstName = "Prak", LastName="Chin",Age=19, Street = "South St, Apt#155", City="Roseville", StateCd="CA", Zipcode="95747", Interests = "football, racing cars"},
                new Person { FirstName = "Caroline", LastName="Samler", Age=56,Street = "North St, Apt#54", City="Rancho Cordova", StateCd="CA", Zipcode="95140", Interests ="Nintendo, Xbox, Netflix" },
                new Person { FirstName = "David", LastName="Jeffer", Age=39,Street = "East St, Apt#23", City="Elk Grove", StateCd="CA", Zipcode="95847", Interests = "" },
                new Person { FirstName = "Abigail", LastName="McIntire", Age=44,Street = "West St, Apt#99", City="Rocklin", StateCd="CA", Zipcode="95748", Interests = "Swimming, racquet ball, tennis" }

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