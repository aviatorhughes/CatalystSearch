var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CatalystSearch;
(function (CatalystSearch) {
    var ViewModels;
    (function (ViewModels) {
        var Person = (function (_super) {
            __extends(Person, _super);
            function Person() {
                var _this = _super.call(this) || this;
                _this.person = ko.observable(new CatalystSearch.Models.Person());
                _this.isFormPostValid = ko.observable(true);
                _this.validationErrors = ko.observable('');
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
                _this.errMsgStateLength = ko.observable('Invalid State code. Please provide 2-character State code only.');
                _this.isZipcodeValid = ko.observable(true);
                _this.errMsgZipcode = ko.observable('Zipcode is required.');
                _this.isZipcodeFormatValid = ko.observable(true);
                _this.errMsgZipcodeFormat = ko.observable('Zipcode is not valid. Please enter a valid US zipcode.');
                _this.isPhotoBig = ko.observable(true);
                _this.errMsgPhotoBig = ko.observable('Photo size not allowed! Please upload a smaller size file.');
                return _this;
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
                    $.blockUI();
                    //ajax call to save
                    $.ajax({
                        url: "/Home/AddPerson",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({ person: ko.toJS(this.person()) }),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            if (!response.success) {
                                //Model validation errors on form post 
                                _this.isFormPostValid(false);
                                _this.validationErrors(response.responseText.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;"));
                            }
                            else {
                                //success 
                                _this.showSuccessfulSaveMessage();
                                //take the user back to search page
                                setTimeout(function () {
                                    location.href = '/Home/Index';
                                }, 500);
                            }
                        },
                        error: function (response) {
                            //something went wrong
                            _this.showAjaxCallSaveErrorMessage(response);
                        },
                        complete: function (data) {
                            setTimeout(function () {
                                $.unblockUI();
                            }, 200);
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
                this.isZipcodeFormatValid(true);
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
                else if (!/^(AK|AL|AR|AZ|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NB|NC|ND|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY)$/i.test(this.person().stateCd().trim())) {
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