"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var account_service_1 = require("./_services/account.service");
var navbar_component_1 = require("./navbar/navbar.component");
var ngx_spinner_1 = require("ngx-spinner");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Social Media App';
        this.accountService = core_1.inject(account_service_1.AccountService);
    }
    AppComponent.prototype.ngOnInit = function () {
        this.setCurrentUser();
    };
    AppComponent.prototype.setCurrentUser = function () {
        var user = localStorage.getItem('user');
        if (user) {
            this.accountService.currentUser.set(JSON.parse(user));
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            standalone: true,
            imports: [common_1.CommonModule, navbar_component_1.NavComponent, router_1.RouterOutlet, ngx_spinner_1.NgxSpinnerComponent],
            templateUrl: './app.component.html',
            styleUrl: './app.component.css'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
