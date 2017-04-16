namespace CatalystSearch.ViewModels {
    export class BaseViewModel {
        private loadErrorMessage: KnockoutObservable<string> = ko.observable("An error occurred while trying to fetch the data. Please try again and if the problem persists, contact support team.");
        private saveErrorMessage: KnockoutObservable<string> = ko.observable("An error occurred while trying to save the data. Please try again and if the problem persists, contact support team.");

        constructor() {

        }

        protected showSuccessfulSaveMessage(): void {
            toastr.success('Changes saved successfully');
        }

        protected showAjaxCallLoadErrorMessage(errorResponse: any, message?: string): void {
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
        }

        protected showAjaxCallSaveErrorMessage(errorResponse: any, message?: string): void {
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
        }
    }
}