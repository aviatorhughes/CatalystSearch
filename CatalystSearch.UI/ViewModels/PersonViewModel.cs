using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CatalystSearch.UI.ViewModels
{
    public class PersonViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public byte[] Picture { get; set; }
        public string Interests { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string StateCd { get; set; }
        public string Zipcode { get; set; }

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

        public string Base64Picture
        {
            get
            {
                if(Picture != null && Picture.Length > 0)
                {
                    return Convert.ToBase64String(Picture);
                }
                return "";
            }
        }
    }
}