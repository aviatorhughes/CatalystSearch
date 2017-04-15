using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CatalystSearch.Data.Repositories;
using System.Configuration;
using System.IO;

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
    }
}
