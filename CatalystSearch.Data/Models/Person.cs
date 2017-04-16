using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CatalystSearch.Data.Models
{
    public class Person : BaseSearchEntity
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(50), Required]
        public string FirstName { get; set; }

        [MaxLength(50), Required]
        public string LastName { get; set; }

        [Required]
        public int Age { get; set; }

        [MaxLength(255), Required]
        public string Street { get; set; }

        [MaxLength(255), Required]
        public string City { get; set; }

        [MaxLength(2), Required]
        public string StateCd { get; set; }

        [MaxLength(10), Required]
        public string Zipcode { get; set; }

        [MaxLength(500)]
        public string Interests { get; set; }

        public byte[] Picture { get; set; }

        [Column(TypeName = "varchar(MAX)")]
        public string Base64Picture { get; set; }
    }
}