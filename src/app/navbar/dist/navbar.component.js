"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var common_1 = require("@angular/common");
var account_service_1 = require("../_services/account.service");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var ngx_toastr_1 = require("ngx-toastr");
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.router = core_1.inject(router_1.Router);
        this.toastr = core_1.inject(ngx_toastr_1.ToastrService);
        this.model = {};
    }
    NavComponent.prototype.login = function () {
        var _this = this;
        this.accountService.login(this.model).subscribe({
            next: function (_) {
                _this.router.navigateByUrl('/members');
            },
            error: function (error) { return _this.toastr.error(error.error); }
        });
    };
    NavComponent.prototype.logout = function () {
        this.accountService.logout();
        this.router.navigateByUrl('/');
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            standalone: true,
            imports: [forms_1.FormsModule, router_1.RouterLink, dropdown_1.BsDropdownModule, router_1.RouterLinkActive, common_1.TitleCasePipe],
            templateUrl: './navbar.component.html',
            styleUrl: './navbar.component.css'
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
