"use strict";
var bindings = new Map();
var singletons = new Map();
var DEPENDENCIES = Symbol('DEPENDENCIES');
var INJECT = Symbol('INJECT');
var Container = (function () {
    function Container() {
    }
    Container.bind = function (iClass, Class, options) {
        Object.setPrototypeOf(Class, iClass);
        bindings.set(iClass, Class);
        if (options && options.singleton) {
            this.registerAsSingleton(Class);
        }
    };
    Container.getInstanceOf = function (clazz) {
        if (bindings.has(clazz)) {
            clazz = bindings.get(clazz);
        }
        return this.resolve(clazz);
    };
    Container.resolve = function (clazz) {
        if (singletons.has(clazz)) {
            return this.resolveSingleton(clazz);
        }
        return this.resolveInstance(clazz);
    };
    Container.resolveInstance = function (clazz) {
        if (typeof clazz != "function")
            throw new Error(clazz + " must be class not a " + typeof clazz);
        var classes = clazz[DEPENDENCIES] || [];
        var dependencies = classes.map(this.getInstanceOf.bind(this));
        return this.inject(clazz, dependencies);
    };
    Container.registerAsSingleton = function (clazz) {
        if (!singletons.has(clazz)) {
            singletons.set(clazz, null);
        }
    };
    Container.resolveSingleton = function (clazz) {
        if (singletons.get(clazz) === null) {
            singletons.set(clazz, this.resolveInstance(clazz));
        }
        return singletons.get(clazz);
    };
    Container.registerDependencies = function (clazz) {
        var dependencies = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dependencies[_i - 1] = arguments[_i];
        }
        clazz[DEPENDENCIES] = dependencies;
    };
    Container.registerDependency = function (clazz, key, Interface) {
        var inject = clazz[INJECT];
        if (!inject) {
            inject = clazz[INJECT] = {};
        }
        inject[key] = Interface;
    };
    Container.inject = function (clazz, dependencies) {
        var _this = this;
        var injectors = clazz[INJECT] || {};
        var instance = Object.create(null);
        Object.keys(injectors)
            .forEach(function (key) {
            instance[key] = _this.getInstanceOf(injectors[key]);
        });
        Object.setPrototypeOf(instance, clazz.prototype);
        clazz.apply(instance, dependencies);
        return instance;
    };
    return Container;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;
//# sourceMappingURL=container.js.map