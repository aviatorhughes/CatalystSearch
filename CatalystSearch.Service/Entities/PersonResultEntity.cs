using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Web;

namespace CatalystSearch.Service.Entities
{
    public class PersonResultEntity
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required, StringLength(50)]
        public string LastName { get; set; }
        [Required, Range(0, 150, ErrorMessage ="Invalid age. Please provide a valid value between 0 and 150.")]
        public int Age { get; set; }
        //public byte[] Picture { get; set; } //If we want to use Byte[] for saving image
        [StringLength(500)]
        public string Interests { get; set; }
        [Required, StringLength(255)]
        public string Street { get; set; }
        [Required, StringLength(255)]
        public string City { get; set; }

        [Display(Name="State") Required, StringLength(2)]
        [RegularExpression(@"^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i", ErrorMessage = "Invalid State code. Please provide 2-character State code only.")]
        public string StateCd { get; set; }
        [Required, StringLength(10), RegularExpression(@"^\d{5}(?:[-\s]\d{4})?$", ErrorMessage = "Zipcode is not valid. Please enter a valid US zipcode.")]
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

        public string Base64Picture { get; set; }

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