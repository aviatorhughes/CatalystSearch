var CatalystSearch;
(function (CatalystSearch) {
    var Models;
    (function (Models) {
        var Person = (function () {
            function Person() {
                this.id = ko.observable(0);
                this.firstName = ko.observable('');
                this.lastName = ko.observable('');
                this.name = ko.observable('');
                this.age = ko.observable(0);
                this.street = ko.observable('');
                this.city = ko.observable('');
                this.stateCd = ko.observable('');
                this.zipcode = ko.observable('');
                this.address = ko.observable('');
                this.base64Picture = ko.observable('');
                this.interests = ko.observable('');
                this.picture = ko.observable();
            }
            return Person;
        }());
        Models.Person = Person;
    })(Models = CatalystSearch.Models || (CatalystSearch.Models = {}));
})(CatalystSearch || (CatalystSearch = {}));
//# sourceMappingURL=person.js.map