"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MembersService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var userParams_1 = require("../_models/userParams");
var account_service_1 = require("./account.service");
var MembersService = /** @class */ (function () {
    function MembersService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.baseUrl = environment_1.environment.apiUrl;
        this.paginatedResult = core_1.signal(null);
        this.memberCache = new Map();
        this.user = this.accountService.currentUser();
        this.userParams = core_1.signal(new userParams_1.UserParams(this.user));
    }
    MembersService.prototype.resetUserParams = function () {
        this.userParams.set(new userParams_1.UserParams(this.user));
    };
    MembersService.prototype.getMembers = function () {
        var _this = this;
        var response = this.memberCache.get(Object.values(this.userParams()).join('-'));
        if (response)
            return this.setPaginatedResponse(response);
        var params = this.setPaginationHeaders(this.userParams().pageNumber, this.userParams().pageSize);
        params = params.append('minAge', this.userParams().minAge);
        params = params.append('maxAge', this.userParams().maxAge);
        params = params.append('gender', this.userParams().gender);
        params = params.append('orderBy', this.userParams().orderBy);
        return this.http.get(this.baseUrl + 'users', { observe: 'response', params: params }).subscribe({
            next: function (response) {
                _this.setPaginatedResponse(response);
                _this.memberCache.set(Object.values(_this.userParams()).join('-'), response);
            }
        });
    };
    MembersService.prototype.setPaginatedResponse = function (response) {
        this.paginatedResult.set({
            items: response.body,
            pagination: JSON.parse(response.headers.get('Pagination'))
        });
    };
    MembersService.prototype.setPaginationHeaders = function (pageNumber, pageSize) {
        var params = new http_1.HttpParams();
        if (pageNumber && pageSize) {
            params = params.append('pageNumber', pageNumber);
            params = params.append('pageSize', pageSize);
        }
        return params;
    };
    MembersService.prototype.getMember = function (username) {
        var member = __spreadArrays(this.memberCache.values()).reduce(function (arr, elem) { return arr.concat(elem.body); }, [])
            .find(function (m) { return m.username === username; });
        if (member)
            return rxjs_1.of(member);
        return this.http.get(this.baseUrl + 'users/' + username);
    };
    MembersService.prototype.updateMember = function (member) {
        var _this = this;
        return this.http.put(this.baseUrl + 'users', member).pipe(rxjs_1.tap(function () {
            _this.memberCache.set(_this.userParams().pageNumber + '-' + _this.userParams().pageSize, null);
            _this.memberCache.set(Object.values(_this.userParams()).join('-'), null);
        }));
    };
    MembersService.prototype.setMainPhoto = function (photo) {
        var _this = this;
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(rxjs_1.tap(function () {
            var members = __spreadArrays(_this.memberCache.values());
        }));
    };
    MembersService.prototype.deletePhoto = function (photo) {
        var _this = this;
        return this.http["delete"](this.baseUrl + 'users/delete-photo/' + photo.id).pipe(rxjs_1.tap(function () {
            var members = __spreadArrays(_this.memberCache.values());
        }));
    };
    MembersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MembersService);
    return MembersService;
}());
exports.MembersService = MembersService;
