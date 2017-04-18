using AutoMapper;
using CatalystSearch.Data.Models;
using CatalystSearch.Service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Service
{
    public static class AutoMapperServiceConfiguration
    {
        public static void Configure()
        {
            ConfigurePersonMapping();
        }

        private static void ConfigurePersonMapping()
        {
            var config = new AutoMapper.Configuration.MapperConfigurationExpression();
            config.CreateMap<AddPersonEntity, Person>();
            Mapper.Initialize(config);
        }
    }
}
