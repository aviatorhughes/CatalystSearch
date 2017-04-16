using CatalystSearch.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Data
{
    public static class Extensions
    {
        public static void SetCommonEntityFields(this ISearchEntity entity)
        {
            entity.CreatedById = entity.ModifiedById = -1; //Ideally it should be the logged in user id
            entity.CreatedOn = entity.ModifiedOn = DateTime.UtcNow;
        }
    }
}
