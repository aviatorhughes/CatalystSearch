using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CatalystSearch.Service.Entities
{
    public class AddPersonEntity
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required, StringLength(50)]
        public string LastName { get; set; }
        [Required, Range(0, 150, ErrorMessage = "Invalid age. Please provide a valid value between 0 and 150.")]
        public int Age { get; set; }
        //public byte[] Picture { get; set; } //If we want to use Byte[] for saving image
        [StringLength(500)]
        public string Interests { get; set; }
        [Required, StringLength(255)]
        public string Street { get; set; }
        [Required, StringLength(255)]
        public string City { get; set; }

        [Display(Name = "State"), Required, StringLength(2)]
        [RegularExpression(@"(?i)^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$", ErrorMessage = "Invalid State code. Please provide 2-character State code only.")]
        public string StateCd { get; set; }
        [Required, StringLength(10), RegularExpression(@"^\d{5}(?:[-\s]\d{4})?$", ErrorMessage = "Zipcode is not valid. Please enter a valid US zipcode.")]
        public string Zipcode { get; set; }
        public string Base64Picture { get; set; }
    }
}
