using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CatalystSearch.UI.Extensions
{
    public static class ObjectExtensions
    {
        /// <summary>Serializes the object to a JSON string.</summary>
        /// <returns>A JSON string representation of the object.</returns>
        public static string ToJson(this object value)
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                Converters = new List<JsonConverter> { new StringEnumConverter() }
            };

            return JsonConvert.SerializeObject(value, settings);
        }

        public static object Objectify(this string json)
        {
            return new { d = json };
        }
    }
}