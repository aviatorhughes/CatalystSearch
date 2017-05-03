namespace CatalystSearch.ViewModels {
    export class Search extends BaseViewModel {
        searchText: KnockoutObservable<string> = ko.observable('');
        searchStarted: KnockoutObservable<boolean> = ko.observable(false);
        searchResults: KnockoutObservableArray<CatalystSearch.Models.Person> = ko.observableArray([]);
        isSlowSearch: KnockoutObservable<boolean> = ko.observable(false);

        isSearchInputValid: KnockoutObservable<boolean> = ko.observable(true);
        invalidSearchInputErrorMessage: KnockoutObservable<string> = ko.observable('Invalid search input. Please use alpha-numeric only.');
        isInputMinLengthValid: KnockoutObservable<boolean> = ko.observable(true);
        minLengthSearchInputErrorMessage: KnockoutObservable<string> = ko.observable('Please input at least 2 characters or more.');

        dataTableOptions: KnockoutObservable<any> = ko.observable({
            paging: true,
            "order": [[0, "asc"]],
            "dom": '<"pull-left"f><"pull-right"l>tip',
            "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [ 4 ] }],
            "oLanguage": {
                "sSearch": "Filter Results: ",
                "sEmptyTable": "No results found."
            },
        });

        constructor() {
            super();
        }

        //private methods
        private addPerson(): void {
            location.href = "/Home/AddPerson";
        }

        //Get search results 
        private getSearchResults(): void {
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
                    success: (result) => {
                        $.map(result, (data, ix) => {
                            console.log(data);
                            var tempArray = [];

                            data.forEach((item) => {
                                var temp = ko.mapping.fromJS(item, {}, new CatalystSearch.Models.Person());
                                tempArray.push(temp);
                            });

                            this.searchResults.pushAll(tempArray);
                        });
                    },
                    error: (response) => {
                        this.showAjaxCallLoadErrorMessage(response);
                    },
                    complete: (data) => {
                        this.isSlowSearch(false);
                        setTimeout(() => {
                            $.unblockUI();
                        }, 200);
                    }
                });
            }
            else
            {
                $.unblockUI();
            }
        }

        //Simulate slow search 
        private getSearchResultsSlowly(): void {
            this.validateSearchInput(this.searchText());

            //If input is valid 
            if (this.isInputMinLengthValid() && this.isSearchInputValid()) {
                this.isSlowSearch(true);
                $.blockUI();
                setTimeout(() => {
                    this.getSearchResults();
                }, 5000);
            }
        }

        //validate search input
        private validateSearchInput(searchInput: string): void {
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
        }
    }

    export class SearchConfig {
        "use strict";
        viewModel: Search;

        init() {
            this.viewModel = new Search();
            ko.applyBindings(this.viewModel);
        }
    }
}