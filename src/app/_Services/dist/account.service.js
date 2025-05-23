"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("../../environments/environment");
var AccountService = /** @class */ (function () {
    function AccountService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.baseUrl = environment_1.environment.apiUrl;
        this.currentUser = core_1.signal(null);
    }
    AccountService.prototype.login = function (model) {
        var _this = this;
        return this.http.post(this.baseUrl + 'account/login', model).pipe(rxjs_1.map(function (user) {
            if (user) {
                _this.setCurrentUser(user);
            }
        }));
    };
    AccountService.prototype.register = function (model) {
        var _this = this;
        return this.http.post(this.baseUrl + 'account/register', model).pipe(rxjs_1.map(function (user) {
            if (user) {
                _this.setCurrentUser(user);
            }
            return user;
        }));
    };
    AccountService.prototype.setCurrentUser = function (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
    };
    AccountService.prototype.logout = function () {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    };
    AccountService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
