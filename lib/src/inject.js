"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
require("reflect-metadata");
function inject() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var target = args[0];
    var key = args[1];
    if (typeof target == 'object') {
        var Interface = Reflect.getMetadata("design:type", target, key);
        container_1.default.registerDependency(target.constructor, key, Interface);
    }
    else {
        var args_1 = arguments;
        return function (clazz, name) {
            container_1.default.registerDependencies.apply(container_1.default, [clazz].concat(Array.prototype.slice.call(args_1)));
        };
    }
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map