export function autoBind(_1, _2, descriptor) {
    var method = descriptor.value;
    var createDescriptor = {
        configurable: true,
        get: function () {
            return method.bind(this);
        }
    };
    return createDescriptor;
}
