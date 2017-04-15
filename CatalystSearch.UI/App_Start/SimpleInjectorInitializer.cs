[assembly: WebActivator.PostApplicationStartMethod(typeof(CatalystSearch.UI.App_Start.SimpleInjectorInitializer), "Initialize")]

namespace CatalystSearch.UI.App_Start
{
    using System.Reflection;
    using System.Web.Mvc;

    using SimpleInjector;
    using SimpleInjector.Integration.Web;
    using SimpleInjector.Integration.Web.Mvc;
    using Data.Interfaces;
    using Data.Repositories;
    using Service.Interfaces;
    using Service;
    using Data.Models;

    public static class SimpleInjectorInitializer
    {
        /// <summary>Initialize the container and register it as MVC3 Dependency Resolver.</summary>
        public static void Initialize()
        {
            var container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();
            
            InitializeContainer(container);

            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());
            
            container.Verify();
            
            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));
        }
     
        private static void InitializeContainer(Container container)
        {
            //Register your services here (remove this line).

            // For instance:
            container.Register<ISearchRepository, SearchRepository>(Lifestyle.Scoped);
            container.Register<ISearchService, SearchService>(Lifestyle.Scoped);
            container.Register<SearchContext, SearchContext>(Lifestyle.Scoped);
        }
    }
}