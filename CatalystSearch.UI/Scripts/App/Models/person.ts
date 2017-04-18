namespace CatalystSearch.Models {
    export class Person {
        id: KnockoutObservable<number> = ko.observable(0);
        firstName: KnockoutObservable<string> = ko.observable('').trimmed();
        lastName: KnockoutObservable<string> = ko.observable('').trimmed();
        name: KnockoutObservable<string> = ko.observable('');
        age: KnockoutObservable<number> = ko.observable(0);
        street: KnockoutObservable<string> = ko.observable('').trimmed();
        city: KnockoutObservable<string> = ko.observable('').trimmed();
        stateCd: KnockoutObservable<string> = ko.observable('').trimmed();
        zipcode: KnockoutObservable<string> = ko.observable('').trimmed();
        address: KnockoutObservable<string> = ko.observable('');
        base64Picture: KnockoutObservable<string> = ko.observable('');
        interests: KnockoutObservable<string> = ko.observable('').trimmed();
        picture = ko.observable();
    }
}