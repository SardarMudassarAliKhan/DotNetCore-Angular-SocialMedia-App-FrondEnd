"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var account_service_1 = require("../_services/account.service");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.cancelRegister = core_1.output();
        this.model = {};
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.accountService.register(this.model).subscribe({
            next: function (response) {
                console.log(response);
                _this.cancel();
            },
            error: function (error) { return console.log(error); }
        });
    };
    RegisterComponent.prototype.cancel = function () {
        this.cancelRegister.emit(false);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            standalone: true,
            imports: [forms_1.FormsModule],
            templateUrl: './register.component.html',
            styleUrl: './register.component.css'
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
