using CatalystSearch.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CatalystSearch.Service.Entities;
using CatalystSearch.Data.Repositories;
using CatalystSearch.Data.Interfaces;
using CatalystSearch.Data.Models;
using AutoMapper;

namespace CatalystSearch.Service
{
    public class SearchService : ISearchService
    {
        #region Public Properties
        public ISearchRepository SearchRepository { get; set; }
        #endregion

        #region Construction
        public SearchService(ISearchRepository searchRepository)
        {
            this.SearchRepository = searchRepository; 
        }
        #endregion

        #region Public Methods
        public IEnumerable<PersonResultEntity> GetSearchResults(string searchText)
        {
            try
            {
                var results = from person in this.SearchRepository.GetPeople(searchText)
                              select new PersonResultEntity
                              {
                                  FirstName = person.FirstName,
                                  LastName = person.LastName,
                                  Age = person.Age,
                                  Street = person.Street,
                                  City = person.City,
                                  StateCd = person.StateCd,
                                  Zipcode = person.Zipcode,
                                  Id = person.Id,
                                  Interests = person.Interests,
                                  Picture = person.Picture
                              };

                return results.ToList();
            }
            catch(Exception ex)
            {
                throw; 
            }
        }

        public void SavePerson(PersonResultEntity personEntity)
        {
            if(personEntity == null)
            {
                throw new ArgumentNullException("personEntity");
            }

            try
            {
                Person person = new Person();
                var config = new AutoMapper.Configuration.MapperConfigurationExpression();
                config.CreateMap<PersonResultEntity, Person>();
                Mapper.Initialize(config);

                Mapper.Map<PersonResultEntity, Person>(personEntity, person);

                this.SearchRepository.SavePerson(person);
            }
            catch(Exception ex)
            {
                throw; 
            }
        }
        #endregion
    }
}
