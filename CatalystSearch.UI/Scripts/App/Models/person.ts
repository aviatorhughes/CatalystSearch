namespace CatalystSearch.Models {
    export class Person {
        id: KnockoutObservable<number> = ko.observable(0);
        firstName: KnockoutObservable<string> = ko.observable('');
        lastName: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        age: KnockoutObservable<number> = ko.observable(0);
        street: KnockoutObservable<string> = ko.observable('');
        city: KnockoutObservable<string> = ko.observable('');
        stateCd: KnockoutObservable<string> = ko.observable('');
        zipcode: KnockoutObservable<string> = ko.observable('');
        address: KnockoutObservable<string> = ko.observable('');
        base64Picture: KnockoutObservable<string> = ko.observable('');
        interests: KnockoutObservable<string> = ko.observable('');
        picture = ko.observable();
    }
}