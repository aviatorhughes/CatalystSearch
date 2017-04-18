namespace CatalystSearch.ViewModels {

    export class Person extends BaseViewModel {
        person: KnockoutObservable<Models.Person> = ko.observable(new Models.Person());

        isFormPostValid: KnockoutObservable<boolean> = ko.observable(true);
        validationErrors: KnockoutObservable<string> = ko.observable('');

        isFirstNameValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgFirstName: KnockoutObservable<string> = ko.observable('First Name is required.');
        isLastNameValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgLastName: KnockoutObservable<string> = ko.observable('Last Name is required.');
        isAgeValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgAge: KnockoutObservable<string> = ko.observable('Age is not valid. Please provide valid value.');
        isStreetValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgStreet: KnockoutObservable<string> = ko.observable('Street is required.');
        isCityValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgCity: KnockoutObservable<string> = ko.observable('City is required.');
        isStateValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgState: KnockoutObservable<string> = ko.observable('State is required.');
        isStateLengthValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgStateLength: KnockoutObservable<string> = ko.observable('Invalid State code. Please provide 2-character State code only.');
        isZipcodeValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgZipcode: KnockoutObservable<string> = ko.observable('Zipcode is required.');
        isZipcodeFormatValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgZipcodeFormat: KnockoutObservable<string> = ko.observable('Zipcode is not valid. Please enter a valid US zipcode.');
        isPhotoBig: KnockoutObservable<boolean> = ko.observable(true);
        errMsgPhotoBig: KnockoutObservable<string> = ko.observable('Photo size not allowed! Please upload a smaller size file.');

        constructor() {
            super();
        }

        //private methods
        private savePerson(): void {
            //validate 
            if (this.validateSavePersonForm()) {
                $.blockUI();
                //ajax call to save
                $.ajax({
                    url: "/Home/AddPerson",
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify({ person: ko.toJS(this.person()) }),
                    contentType: "application/json; charset=utf-8",
                    success: (response) => {
                        if (!response.success) {
                            //Model validation errors on form post 
                            this.isFormPostValid(false);
                            this.validationErrors(response.responseText.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;"));
                        }
                        else {
                            //success 
                            this.showSuccessfulSaveMessage();
                            //take the user back to search page
                            setTimeout(() => {
                                location.href = '/Home/Index';
                            }, 600);
                        }
                    },
                    error: (response) => {
                        //something went wrong
                        this.showAjaxCallSaveErrorMessage(response);
                    },
                    complete: (data) => {
                        setTimeout(() => {
                            $.unblockUI();
                        }, 200);
                    }
                });
            }
        }

        //Explicity validation to have more control on each field and different types of validation and corresponding error message. 
        private validateSavePersonForm(): boolean {
            this.isFirstNameValid(true);
            this.isLastNameValid(true);
            this.isAgeValid(true);
            this.isStreetValid(true);
            this.isCityValid(true);
            this.isStateValid(true); this.isStateLengthValid(true);
            this.isZipcodeValid(true); this.isZipcodeFormatValid(true);
            this.isPhotoBig(true);

            //interests && photo are the optional fields. Rest all are required
            if (!(this.person().firstName().trim().length > 0)) {
                this.isFirstNameValid(false);
            }
            if (!(this.person().lastName().trim().length > 0)) {
                this.isLastNameValid(false);
            }

            var ageNumericVal = this.person().age();
            if (!(this.isNumber(ageNumericVal) && ageNumericVal > 0 && ageNumericVal <= 150 && ageNumericVal % 1 === 0)) {
                this.isAgeValid(false);
            }
            if (!(this.person().street().trim().length > 0)) {
                this.isStreetValid(false);
            }
            if (!(this.person().city().trim().length > 0)) {
                this.isCityValid(false);
            }
            if (!(this.person().stateCd().trim().length > 0)) {
                this.isStateValid(false);
            }
            else if (! /^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i.test(this.person().stateCd().trim())) {
                this.isStateLengthValid(false);
            }

            if (!(this.person().zipcode().trim().length > 0)) {
                this.isZipcodeValid(false);
            }
            else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(this.person().zipcode().trim())) {
                this.isZipcodeFormatValid(false);
            }

            if (this.person().base64Picture() != null && this.person().base64Picture().length > 0) {

                //check if the image is too big!
                var img = new Image();
                img.src = this.person().base64Picture();
                img.onload = function () {
                    var imgWidth = img.naturalWidth, imgHeight = img.naturalHeight;
                };
                //just a placeholder validation with the hardcoded values to show that we can change it to be whatever we like it to be. 
                if (img.naturalWidth > 450 || img.naturalHeight > 450) {
                    this.isPhotoBig(false);
                }
            }

            return (this.isFirstNameValid() && this.isLastNameValid() && this.isAgeValid() && this.isStreetValid() && this.isCityValid() &&
                this.isStateValid() && this.isStateLengthValid() && this.isZipcodeValid() && this.isZipcodeFormatValid() && this.isPhotoBig());
        }
    }

    export class PersonConfig {
        "use strict";

        viewModel: Person;

        private init(): void {
            this.viewModel = new Person();
            ko.applyBindings(this.viewModel);
        }
    }
}