ko.bindingHandlers.dataTablesForEach = {
    page: 0,
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var options = ko.unwrap(valueAccessor());

        var dataTableOptions = ko.unwrap(options.dataTableOptions);

        ko.unwrap(options.data);
        if (dataTableOptions.paging) {
            valueAccessor().data.subscribe(function (changes) {
                var table = $(element).closest('table').DataTable();
                ko.bindingHandlers.dataTablesForEach.page = table.page();
                table.destroy();
            }, null, 'arrayChange');
        }
        var nodes = Array.prototype.slice.call(element.childNodes, 0);
        ko.utils.arrayForEach(nodes, function (node) {
            if (node && node.nodeType !== 1) {
                node.parentNode.removeChild(node);
            }
        });
        return ko.bindingHandlers.foreach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = ko.unwrap(valueAccessor()),
            dataTableOptions = ko.unwrap(options.dataTableOptions),
            key = 'DataTablesForEach_Initialized';

        ko.unwrap(options.data);
        var table;
        var id = $(element).closest('table').attr('id');

        table = $(element).closest('table').DataTable();
        table.destroy();

        ko.bindingHandlers.foreach.update(element, valueAccessor, allBindings, viewModel, bindingContext);

        table = $(element).closest('table').DataTable(dataTableOptions);

        if (dataTableOptions.paging) {
            if (table.page.info().pages - ko.bindingHandlers.dataTablesForEach.page == 0)
                table.page(--ko.bindingHandlers.dataTablesForEach.page).draw(false);
            else
                table.page(ko.bindingHandlers.dataTablesForEach.page).draw(false);
        }
        if (!ko.utils.domData.get(element, key) && (options.data || options.length))
            ko.utils.domData.set(element, key, true);
        return { controlsDescendantBindings: true };
    }
};