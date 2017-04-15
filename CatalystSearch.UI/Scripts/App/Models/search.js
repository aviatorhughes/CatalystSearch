var CatalystSearch;
(function (CatalystSearch) {
    var Models;
    (function (Models) {
        var Search = (function () {
            function Search() {
                this.id = ko.observable(0);
                this.firstName = ko.observable('');
                this.lastName = ko.observable('');
                this.name = ko.observable('');
                this.age = ko.observable(0);
                this.address = ko.observable('');
                this.base64Picture = ko.observable('');
                this.interests = ko.observable('');
            }
            return Search;
        }());
        Models.Search = Search;
    })(Models = CatalystSearch.Models || (CatalystSearch.Models = {}));
})(CatalystSearch || (CatalystSearch = {}));
