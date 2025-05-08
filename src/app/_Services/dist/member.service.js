"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MembersService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var MembersService = /** @class */ (function () {
    function MembersService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.baseUrl = environment_1.environment.apiUrl;
        this.members = core_1.signal([]);
    }
    MembersService.prototype.getMembers = function () {
        var _this = this;
        return this.http.get(this.baseUrl + 'users').subscribe({
            next: function (members) { return _this.members.set(members); }
        });
    };
    MembersService.prototype.getMember = function (username) {
        var member = this.members().find(function (x) { return x.username === username; });
        if (member !== undefined)
            return rxjs_1.of(member);
        return this.http.get(this.baseUrl + 'users/' + username);
    };
    MembersService.prototype.updateMember = function (member) {
        var _this = this;
        return this.http.put(this.baseUrl + 'users', member).pipe(rxjs_1.tap(function () {
            _this.members.update(function (members) { return members.map(function (m) { return m.username === member.username
                ? member : m; }); });
        }));
    };
    MembersService.prototype.setMainPhoto = function (photo) {
        var _this = this;
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(rxjs_1.tap(function () {
            _this.members.update(function (members) { return members.map(function (m) {
                if (m.photos.includes(photo)) {
                    m.photoUrl = photo.url;
                }
                return m;
            }); });
        }));
    };
    MembersService.prototype.deletePhoto = function (photo) {
        var _this = this;
        return this.http["delete"](this.baseUrl + 'users/delete-photo/' + photo.id).pipe(rxjs_1.tap(function () {
            _this.members.update(function (members) { return members.map(function (m) {
                if (m.photos.includes(photo)) {
                    m.photos = m.photos.filter(function (x) { return x.id !== photo.id; });
                }
                return m;
            }); });
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
