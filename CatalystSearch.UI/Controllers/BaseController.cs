using CatalystSearch.Service.Interfaces;
using CatalystSearch.UI.Custom;
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

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };
        }
    }
}