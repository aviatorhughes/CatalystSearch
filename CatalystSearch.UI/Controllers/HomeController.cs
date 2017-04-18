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
            if (string.IsNullOrWhiteSpace(searchText))
            {
                throw new ArgumentNullException(searchText);
            }

            var jsonResult = this.SearchService.GetSearchResults(searchText).ToJson();

            return Json(jsonResult.Objectify());
        }

        [HttpGet]
        public ActionResult AddPerson()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddPerson(AddPersonEntity person)
        {
            //Do any custom validations needed

            try
            {
                if (ModelState.IsValid)
                {
                    //save
                    this.SearchService.SavePerson(person);
                    return Json(new { success = true, responseText = "" });
                }
                else
                {
                    string modelErrorMessages = string.Join(Environment.NewLine, ModelState.Values.SelectMany(v => v.Errors).Select(x => x.ErrorMessage));
                    return Json(new { success = false, responseText = modelErrorMessages});
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}