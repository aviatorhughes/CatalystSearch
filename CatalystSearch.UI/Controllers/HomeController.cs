using CatalystSearch.Service.Entities;
using CatalystSearch.Service.Interfaces;
using CatalystSearch.UI.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CatalystSearch.UI.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(ISearchService searchService)
        {
            this.SearchService = searchService;
        }

        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Search(string searchText)
        {
            if(string.IsNullOrWhiteSpace(searchText))
            {
                throw new ArgumentNullException(searchText);
            }

            var jsonResult = this.SearchService.GetSearchResults(searchText).ToJson();

            return Json(jsonResult.Objectify()); 
        }

        [HttpGet]
        public ActionResult AddNewUser()
        {
            return View();
        }

        [HttpPost]
        public void AddNewUser(PersonResultEntity person)
        {
            //validate if any

            try
            {
                //save
                
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}