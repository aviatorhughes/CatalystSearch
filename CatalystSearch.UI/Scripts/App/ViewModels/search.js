var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CatalystSearch;
(function (CatalystSearch) {
    var ViewModels;
    (function (ViewModels) {
        var Search = (function (_super) {
            __extends(Search, _super);
            function Search() {
                var _this = _super.call(this) || this;
                _this.searchText = ko.observable('');
                _this.searchStarted = ko.observable(false);
                _this.searchResults = ko.observableArray([]);
                _this.isSlowSearch = ko.observable(false);
                _this.isSearchInputValid = ko.observable(true);
                _this.invalidSearchInputErrorMessage = ko.observable('Invalid search input. Please use alpha-numeric only.');
                _this.isInputMinLengthValid = ko.observable(true);
                _this.minLengthSearchInputErrorMessage = ko.observable('Please input at least 2 characters or more.');
                _this.dataTableOptions = ko.observable({
                    paging: true,
                    "order": [[0, "asc"]],
                    "dom": '<"pull-left"f><"pull-right"l>tip',
                    "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [4] }],
                    "oLanguage": {
                        "sSearch": "Filter Results: ",
                        "sEmptyTable": "No results found."
                    },
                });
                return _this;
            }
            //private methods
            Search.prototype.addPerson = function () {
                location.href = "/Home/AddPerson";
            };
            //Get search results 
            Search.prototype.getSearchResults = function () {
                var _this = this;
                this.validateSearchInput(this.searchText());
                //If input is valid 
                if (this.isInputMinLengthValid() && this.isSearchInputValid()) {
                    if (!this.isSlowSearch()) {
                        $.blockUI();
                    }
                    this.searchStarted(true);
                    this.searchResults.removeAll();
                    $.ajax({
                        url: "/Home/Search",
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({ searchText: this.searchText() }),
                        success: function (result) {
                            var tempArray = [];
                            $.map(result, function (data, ix) {
                                var temp = ko.mapping.fromJS(data, {}, new CatalystSearch.Models.Person());
                                tempArray.push(temp);
                            });
                            _this.searchResults.pushAll(tempArray);
                        },
                        error: function (response) {
                            _this.showAjaxCallLoadErrorMessage(response);
                        },
                        complete: function (data) {
                            _this.isSlowSearch(false);
                            setTimeout(function () {
                                $.unblockUI();
                            }, 200);
                        }
                    });
                }
                else {
                    $.unblockUI();
                }
            };
            //Simulate slow search 
            Search.prototype.getSearchResultsSlowly = function () {
                var _this = this;
                this.validateSearchInput(this.searchText());
                //If input is valid 
                if (this.isInputMinLengthValid() && this.isSearchInputValid()) {
                    this.isSlowSearch(true);
                    $.blockUI();
                    setTimeout(function () {
                        _this.getSearchResults();
                    }, 5000);
                }
            };
            //validate search input
            Search.prototype.validateSearchInput = function (searchInput) {
                //clear out the error messages before re-checking
                this.isInputMinLengthValid(true);
                this.isSearchInputValid(true);
                //check for minimum length 
                if (searchInput.trim().length < 2) {
                    this.isInputMinLengthValid(false);
                }
                //check for special characters
                if (!(/^[A-Z0-9]+$/i.test(searchInput))) {
                    this.isSearchInputValid(false);
                }
            };
            return Search;
        }(ViewModels.BaseViewModel));
        ViewModels.Search = Search;
        var SearchConfig = (function () {
            function SearchConfig() {
            }
            SearchConfig.prototype.init = function () {
                this.viewModel = new Search();
                ko.applyBindings(this.viewModel);
            };
            return SearchConfig;
        }());
        ViewModels.SearchConfig = SearchConfig;
    })(ViewModels = CatalystSearch.ViewModels || (CatalystSearch.ViewModels = {}));
})(CatalystSearch || (CatalystSearch = {}));
//# sourceMappingURL=search.js.map