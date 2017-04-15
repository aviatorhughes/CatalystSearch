using System.Web;
using System.Web.Optimization;

namespace CatalystSearch.UI
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/knockout-{version}.js",
                        "~/Scripts/knockout-custom.js",
                        "~/Scripts/knockout.mapping-latest.js",
                        "~/Scripts/toastr.js",
                        "~/Scripts/jquery.blockUI.js",
                        "~/Scripts/DataTables/jquery.dataTables.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/custom-scripts").Include(
            //KO CustomBindings
            "~/Scripts/App/KOCustomBindings/dataTablesForEach.js",

            //KO Extensions
            "~/Scripts/App/KOExtensions/trimmed.js",

            //Models
            "~/Scripts/App/Models/search.js",

            //View Models
            "~/Scripts/App/ViewModels/baseViewModel.js",
            "~/Scripts/App/ViewModels/search.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/DataTables/dataTables.bootstrap.min.js",
                      "~/Scripts/DataTables/dataTables.responsive.min.js",
                      "~/Scripts/DataTables/responsive.bootstrap.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/DataTables/css/jquery.dataTables.min.css",
                      "~/Content/toastr.min.css",
                      "~/Content/site.css"));
        }
    }
}
