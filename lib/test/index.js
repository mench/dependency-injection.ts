"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var SimpleClass = (function () {
    function SimpleClass() {
        this.member = "test";
    }
    return SimpleClass;
}());
var Config = (function () {
    function Config() {
    }
    return Config;
}());
var ConfigImpl = (function (_super) {
    __extends(ConfigImpl, _super);
    function ConfigImpl() {
        var _this = this;
        console.info("call constructor");
        _this = _super.call(this) || this;
        return _this;
    }
    ConfigImpl.prototype.get = function () {
        console.info("get method");
    };
    return ConfigImpl;
}(Config));
__decorate([
    index_1.inject,
    __metadata("design:type", SimpleClass)
], ConfigImpl.prototype, "simple", void 0);
var Service = (function () {
    function Service() {
    }
    Service.prototype.sendMessage = function () {
        console.info("Service:send");
    };
    return Service;
}());
__decorate([
    index_1.inject,
    __metadata("design:type", Config)
], Service.prototype, "config", void 0);
var DevService = (function (_super) {
    __extends(DevService, _super);
    function DevService() {
        var _this = this;
        console.info("singleton constructor");
        _this = _super.call(this) || this;
        return _this;
    }
    DevService.prototype.sendMessage = function () {
        console.info("send msg:");
    };
    return DevService;
}(Service));
DevService = __decorate([
    index_1.singleton,
    __metadata("design:paramtypes", [])
], DevService);
var ProdService = (function (_super) {
    __extends(ProdService, _super);
    function ProdService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProdService;
}(Service));
var MyDependency1 = (function () {
    function MyDependency1(config) {
        console.info("constructor MyDependency1", config);
    }
    return MyDependency1;
}());
MyDependency1 = __decorate([
    index_1.inject(Config),
    __metadata("design:paramtypes", [Object])
], MyDependency1);
var MyDependency2 = (function () {
    function MyDependency2(simple) {
        console.info("constructor MyDependency2", simple);
    }
    return MyDependency2;
}());
MyDependency2 = __decorate([
    index_1.inject(SimpleClass),
    __metadata("design:paramtypes", [Object])
], MyDependency2);
var HasDependencies = (function () {
    function HasDependencies(myDep1, myDep2) {
        this.service.sendMessage();
        console.info(myDep1, myDep2);
    }
    return HasDependencies;
}());
__decorate([
    index_1.inject,
    __metadata("design:type", Service)
], HasDependencies.prototype, "service", void 0);
__decorate([
    index_1.inject,
    __metadata("design:type", Service)
], HasDependencies.prototype, "config", void 0);
HasDependencies = __decorate([
    index_1.inject(MyDependency1, MyDependency2),
    __metadata("design:paramtypes", [Object, Object])
], HasDependencies);
var Test = (function () {
    function Test() {
    }
    return Test;
}());
__decorate([
    index_1.inject,
    __metadata("design:type", Service)
], Test.prototype, "service", void 0);
index_1.container.bind(Service, DevService);
index_1.container.bind(Config, ConfigImpl, { singleton: true });
var instance = index_1.container.getInstanceOf(HasDependencies);
instance.service.sendMessage();
var test = index_1.container.getInstanceOf(Test);
var service = index_1.container.getInstanceOf(Service);
console.info(service);
console.info("instance= ", instance);
console.info("test= ", test);
//# sourceMappingURL=index.js.map