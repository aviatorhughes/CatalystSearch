var CatalystSearch;
(function (CatalystSearch) {
    var ViewModels;
    (function (ViewModels) {
        var BaseViewModel = (function () {
            function BaseViewModel() {
                this.loadErrorMessage = ko.observable("An error occurred while trying to fetch the data. Please try again and if the problem persists, contact support team.");
                this.saveErrorMessage = ko.observable("An error occurred while trying to save the data. Please try again and if the problem persists, contact support team.");
            }
            BaseViewModel.prototype.showSuccessfulSaveMessage = function () {
                toastr.success('Changes saved successfully');
            };
            BaseViewModel.prototype.showAjaxCallLoadErrorMessage = function (errorResponse, message) {
                if (errorResponse) {
                    console.log(errorResponse);
                }
                if (!message) {
                    message = this.loadErrorMessage();
                }
                toastr.error(message, "Error Occurred", {
                    closeButton: true,
                    timeOut: 30000
                });
            };
            BaseViewModel.prototype.showAjaxCallSaveErrorMessage = function (errorResponse, message) {
                if (errorResponse) {
                    console.log(errorResponse);
                }
                if (!message) {
                    message = this.saveErrorMessage();
                }
                toastr.error(message, "Error Occurred", {
                    closeButton: true,
                    timeOut: 30000
                });
            };
            BaseViewModel.prototype.isNumber = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            return BaseViewModel;
        }());
        ViewModels.BaseViewModel = BaseViewModel;
    })(ViewModels = CatalystSearch.ViewModels || (CatalystSearch.ViewModels = {}));
})(CatalystSearch || (CatalystSearch = {}));
//# sourceMappingURL=baseViewModel.js.map