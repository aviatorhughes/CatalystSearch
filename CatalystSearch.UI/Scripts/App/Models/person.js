var CatalystSearch;
(function (CatalystSearch) {
    var Models;
    (function (Models) {
        var Person = (function () {
            function Person() {
                this.id = ko.observable(0);
                this.firstName = ko.observable('').trimmed();
                this.lastName = ko.observable('').trimmed();
                this.name = ko.observable('');
                this.age = ko.observable(0);
                this.street = ko.observable('').trimmed();
                this.city = ko.observable('').trimmed();
                this.stateCd = ko.observable('').trimmed();
                this.zipcode = ko.observable('').trimmed();
                this.address = ko.observable('');
                this.base64Picture = ko.observable('');
                this.interests = ko.observable('').trimmed();
                this.picture = ko.observable();
            }
            return Person;
        }());
        Models.Person = Person;
    })(Models = CatalystSearch.Models || (CatalystSearch.Models = {}));
})(CatalystSearch || (CatalystSearch = {}));
//# sourceMappingURL=person.js.map