using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CatalystSearch.Data.Repositories;
using System.Configuration;
using System.IO;
using CatalystSearch.Data.Models;

namespace CatalystSearch.Test
{
    [TestClass]
    public class SearchTest
    {
        [ClassInitialize]
        public static void ClassInit(TestContext ctx)
        {
            //Replace |DataDirectory| with the physical file path - because I'd like to use the same .mdf file in the UI project's App_Data folder for database. 
            var dataDirectory = ConfigurationManager.AppSettings["DataDirectory"];
            var absoluteDataDirectory = Path.GetFullPath(dataDirectory);
            AppDomain.CurrentDomain.SetData("DataDirectory", absoluteDataDirectory);
        }

        [TestMethod] 
        public void NameSearchTest()
        {
            var searchRepository = new SearchRepository(new Data.Models.SearchContext());
            var people = searchRepository.GetPeople("tony");

            Assert.IsNotNull(people);
            Assert.IsTrue(people.Count() > 0);
        }

        [TestMethod]
        public void SavePersonTest()
        {
            var searchRepository = new SearchRepository(new Data.Models.SearchContext());
            var person = new Person();
            person.FirstName = "Paul";
            person.LastName = "Gimmell";
            person.Age = 34;
            person.Street = "Main st";
            person.City = "Rocklin";
            person.StateCd = "CA";
            person.Zipcode = "95747";
            person.Base64Picture = "";
            
            searchRepository.SavePerson(person);

            //Get the person to see if it was saved
            var people = searchRepository.GetPeople(person.FirstName); 

            Assert.IsNotNull(people);
            Assert.IsTrue(people.Count() > 0);
        }
    }
}
