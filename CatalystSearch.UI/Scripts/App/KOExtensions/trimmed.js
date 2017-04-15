ko.subscribable.fn.trimmed = function () {
    return ko.computed({
        read: function () {
            return this();
        },
        write: function (value) {
            this(value.trim());
            this.valueHasMutated();
        },
        owner: this
    });
};