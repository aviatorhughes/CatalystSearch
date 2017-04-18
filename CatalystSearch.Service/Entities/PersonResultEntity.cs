using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CatalystSearch.Service.Entities
{
    public class PersonResultEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        //public byte[] Picture { get; set; } //If we want to use Byte[] for saving image
        public string Interests { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string StateCd { get; set; }
        public string Zipcode { get; set; }
        public string Base64Picture { get; set; }

        //Calculated Properties
        public string Name
        {
            get
            {
                if(!string.IsNullOrWhiteSpace(FirstName) && !string.IsNullOrWhiteSpace(LastName))
                {
                    return string.Concat(FirstName, " ", LastName);
                }
                return "";
            }
        }

        public string Address
        {
            get
            {
                StringBuilder sbAddress = new StringBuilder();
                if(!string.IsNullOrWhiteSpace(Street))
                {
                    sbAddress.Append(Street);
                }
                if(!string.IsNullOrWhiteSpace(City))
                {
                    if(sbAddress.Length > 0)
                    {
                        sbAddress.Append(", ");
                    }
                    sbAddress.Append(City); 
                }
                if (!string.IsNullOrWhiteSpace(StateCd))
                {
                    if (sbAddress.Length > 0)
                    {
                        sbAddress.Append(", ");
                    }
                    sbAddress.Append(StateCd);
                }
                if (!string.IsNullOrWhiteSpace(Zipcode))
                {
                    if (sbAddress.Length > 0)
                    {
                        sbAddress.Append(", ");
                    }
                    sbAddress.Append(Zipcode);
                }
                return sbAddress.ToString();
            }
        }

        #region Construction

        public PersonResultEntity()
        {
            //If we save image in byte[] then convert to base64 before sending it to client HTML img tag
            //if (this.Picture != null && this.Picture.Length > 0)
            //{
            //    this.Base64Picture = Convert.ToBase64String(Picture);
            //}
        }

        #endregion
    }
}