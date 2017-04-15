using CatalystSearch.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CatalystSearch.UI.Controllers
{
    public abstract class BaseController : Controller
    {
        #region Public Properties

        public ISearchService SearchService { get; set; }

        #endregion

        #region Construction
        public BaseController()
        {

        }
        #endregion
    }
}