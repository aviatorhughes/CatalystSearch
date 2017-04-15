using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CatalystSearch.UI.Startup))]
namespace CatalystSearch.UI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
