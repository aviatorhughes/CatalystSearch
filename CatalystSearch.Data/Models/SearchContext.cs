using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;

namespace CatalystSearch.Data.Models
{
    public class SearchContext : DbContext
    {
        // Your context has been configured to use a 'SearchContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'CatalystSearch.UI.Models.SearchContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'SearchContext' 
        // connection string in the application configuration file.
        public SearchContext()
            : base("name=SearchContext")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Person> People { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}