"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
function singleton(Clazz) {
    container_1.default.registerAsSingleton(Clazz);
}
exports.singleton = singleton;
//# sourceMappingURL=singleton.js.map