ko.bindingHandlers.cropImage = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).prop("src", value);
        $(element).Jcrop({
            //onSelect: showCoords,
            bgColor: 'black',
            bgOpacity: .4,
            setSelect: [100, 100, 0, 0],
            boxWidth: 450,
            boxHeight:400
        });
    }
};