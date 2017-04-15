namespace CatalystSearch.Models {
    export class Search {
        id: KnockoutObservable<number> = ko.observable(0);
        firstName: KnockoutObservable<string> = ko.observable('');
        lastName: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        age: KnockoutObservable<number> = ko.observable(0);
        address: KnockoutObservable<string> = ko.observable('');
        base64Picture: KnockoutObservable<string> = ko.observable('');
        interests: KnockoutObservable<string> = ko.observable('');
    }
}