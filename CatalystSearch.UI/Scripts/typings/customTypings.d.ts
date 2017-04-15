interface JQuery {
    modal(options: any): any;
    dialog(option: any): any;
    zIndex(data?: any): any;

    // Datatable functions
    DataTable(options: any);
    DataTable();

    select2(options: any);

    treeview(options: any);
}

interface KnockoutObservableArray<T> extends KnockoutObservable<T[]>, KnockoutObservableArrayFunctions<T> {
    pushAll(array: any[]): void;
}

interface KnockoutObservable<T> {
    trimmed();
}