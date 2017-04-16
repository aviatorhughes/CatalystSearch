namespace CatalystSearch.ViewModels {

    export class Person extends BaseViewModel {
        person: KnockoutObservable<Models.Person> = ko.observable(new Models.Person());

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
        errMsgStateLength: KnockoutObservable<string> = ko.observable('State should be 2-character State code only.');
        isZipcodeValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgZipcode: KnockoutObservable<string> = ko.observable('Zipcode is required.');
        isPhotoValid: KnockoutObservable<boolean> = ko.observable(true);
        errMsgPhoto: KnockoutObservable<string> = ko.observable('Photo is required. Only JPEG pictures are allowed.');
        isPhotoBig: KnockoutObservable<boolean> = ko.observable(true);
        errMsgPhotoBig: KnockoutObservable<string> = ko.observable('Photo size not allowed! Please upload a smaller size file.');

        constructor() {
            super();

            //this.person().base64Picture.subscribe((base64String) => {
            //    this.base64ToArrayBuffer(base64String);
            //    console.log(this.person().photo());
            //});
        }

        private base64ToArrayBuffer(base64): void {

            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            this.person().picture(bytes.buffer);
        }

        //private methods
        private savePerson(): void {
            //validate 
            if (this.validateSavePersonForm()) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                //ajax call to save
                $.ajax({
                    url: "/Home/AddPerson",
                    type: "POST",
                    //dataType: 'json',
                    data: JSON.stringify({ person: ko.toJS(this.person()) }),
                    contentType: "application/json; charset=utf-8",
                    success: (data, status, xhr) => {
                        this.showSuccessfulSaveMessage();
                        //take the user back to search page
                        setTimeout(() => {
                            location.href = '/Home/Index';
                        }, 500);
                    },
                    error: (response) => {
                        this.showAjaxCallSaveErrorMessage(response);
                    },
                    complete: (data) => {
                    }
                });
            }
        }

        private validateSavePersonForm(): boolean {
            this.isFirstNameValid(true);
            this.isLastNameValid(true);
            this.isAgeValid(true);
            this.isStreetValid(true);
            this.isCityValid(true);
            this.isStateValid(true); this.isStateLengthValid(true);
            this.isZipcodeValid(true);
            this.isPhotoBig(true); this.isPhotoValid(true);

            //interests is the only optional field. Rest all are required
            if (!(this.person().firstName().trim().length > 0)) {
                this.isFirstNameValid(false);
            }
            if (!(this.person().lastName().trim().length > 0)) {
                this.isLastNameValid(false);
            }
            if (isNaN(this.person().age()) || this.person().age() > 110) {
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
            if (this.person().stateCd().trim().length > 2) {
                this.isStateLengthValid(false);
            }
            if (!(this.person().zipcode().trim().length > 0)) {
                this.isZipcodeValid(false);
            }
            if (this.person().base64Picture() == null || !(this.person().base64Picture().length > 0)) {
                this.isPhotoValid(false);
            }
            else {
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
                this.isStateValid() && this.isStateLengthValid() && this.isZipcodeValid() && this.isPhotoValid() && this.isPhotoBig());
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