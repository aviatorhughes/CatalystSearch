using CatalystSearch.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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

        public static void TrimStringProperties(this object entity)
        {
            var props = entity.GetType()
                    .GetProperties(BindingFlags.Instance | BindingFlags.Public)
                    // Ignore non-string properties
                    .Where(prop => prop.PropertyType == typeof(string))
                    // Ignore indexers
                    .Where(prop => prop.GetIndexParameters().Length == 0)
                    // Must be both readable and writable
                    .Where(prop => prop.CanWrite && prop.CanRead);

            foreach (PropertyInfo prop in props)
            {
                string value = (string)prop.GetValue(entity, null);
                if (value != null)
                {
                    value = value.Trim();
                    prop.SetValue(entity, value, null);
                }
            }
        }
    }
}
