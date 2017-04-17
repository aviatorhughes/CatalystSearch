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
                                  Base64Picture = person.Base64Picture,

                                  //If we use byte[] for image then convert it to Base64string 
                                  //Picture = person.Picture,
                                  //Base64Picture = person.Picture != null ? string.Concat("data:image/jpeg;base64,", Convert.ToBase64String(person.Picture)) : ""
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
                Mapper.Map<PersonResultEntity, Person>(personEntity, person); //Create Model Entity from the UI representation entity 
                
                //If we use byte[] for image 
                //person.Picture = Convert.FromBase64String(personEntity.Base64Picture.Replace("data:image/jpeg;base64,", String.Empty));

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
