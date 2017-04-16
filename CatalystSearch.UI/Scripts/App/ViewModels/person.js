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
        var Person = (function (_super) {
            __extends(Person, _super);
            function Person() {
                var _this = _super.call(this) || this;
                _this.person = ko.observable(new CatalystSearch.Models.Person());
                _this.isFirstNameValid = ko.observable(true);
                _this.errMsgFirstName = ko.observable('First Name is required.');
                _this.isLastNameValid = ko.observable(true);
                _this.errMsgLastName = ko.observable('Last Name is required.');
                _this.isAgeValid = ko.observable(true);
                _this.errMsgAge = ko.observable('Age is not valid. Please provide valid value.');
                _this.isStreetValid = ko.observable(true);
                _this.errMsgStreet = ko.observable('Street is required.');
                _this.isCityValid = ko.observable(true);
                _this.errMsgCity = ko.observable('City is required.');
                _this.isStateValid = ko.observable(true);
                _this.errMsgState = ko.observable('State is required.');
                _this.isStateLengthValid = ko.observable(true);
                _this.errMsgStateLength = ko.observable('State should be 2-character State code only.');
                _this.isZipcodeValid = ko.observable(true);
                _this.errMsgZipcode = ko.observable('Zipcode is required.');
                _this.isPhotoValid = ko.observable(true);
                _this.errMsgPhoto = ko.observable('Photo is required. Only JPEG pictures are allowed.');
                _this.isPhotoBig = ko.observable(true);
                _this.errMsgPhotoBig = ko.observable('Photo size not allowed! Please upload a smaller size file.');
                return _this;
                //this.person().base64Picture.subscribe((base64String) => {
                //    this.base64ToArrayBuffer(base64String);
                //    console.log(this.person().photo());
                //});
            }
            Person.prototype.base64ToArrayBuffer = function (base64) {
                var binary_string = window.atob(base64);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i);
                }
                this.person().picture(bytes.buffer);
            };
            //private methods
            Person.prototype.savePerson = function () {
                var _this = this;
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
                        success: function (data, status, xhr) {
                            _this.showSuccessfulSaveMessage();
                            //take the user back to search page
                            setTimeout(function () {
                                location.href = '/Home/Index';
                            }, 500);
                        },
                        error: function (response) {
                            _this.showAjaxCallSaveErrorMessage(response);
                        },
                        complete: function (data) {
                        }
                    });
                }
            };
            Person.prototype.validateSavePersonForm = function () {
                this.isFirstNameValid(true);
                this.isLastNameValid(true);
                this.isAgeValid(true);
                this.isStreetValid(true);
                this.isCityValid(true);
                this.isStateValid(true);
                this.isStateLengthValid(true);
                this.isZipcodeValid(true);
                this.isPhotoBig(true);
                this.isPhotoValid(true);
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
            };
            return Person;
        }(ViewModels.BaseViewModel));
        ViewModels.Person = Person;
        var PersonConfig = (function () {
            function PersonConfig() {
            }
            PersonConfig.prototype.init = function () {
                this.viewModel = new Person();
                ko.applyBindings(this.viewModel);
            };
            return PersonConfig;
        }());
        ViewModels.PersonConfig = PersonConfig;
    })(ViewModels = CatalystSearch.ViewModels || (CatalystSearch.ViewModels = {}));
})(CatalystSearch || (CatalystSearch = {}));
//# sourceMappingURL=person.js.map