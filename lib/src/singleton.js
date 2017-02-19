"use strict";
var container_1 = require("./container");
function singleton(Clazz) {
    container_1.default.registerAsSingleton(Clazz);
}
exports.singleton = singleton;
//# sourceMappingURL=singleton.js.map