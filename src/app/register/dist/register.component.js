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
var common_1 = require("@angular/common");
var text_input_component_1 = require("../_forms/text-input/text-input.component");
var date_picker_component_1 = require("../_forms/date-picker/date-picker.component");
var router_1 = require("@angular/router");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.fb = core_1.inject(forms_1.FormBuilder);
        this.router = core_1.inject(router_1.Router);
        this.cancelRegister = core_1.output();
        this.registerForm = new forms_1.FormGroup({});
        this.maxDate = new Date();
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    };
    RegisterComponent.prototype.initializeForm = function () {
        var _this = this;
        this.registerForm = this.fb.group({
            gender: ['male'],
            username: ['', forms_1.Validators.required],
            knownAs: ['', forms_1.Validators.required],
            dateOfBirth: ['', forms_1.Validators.required],
            city: ['', forms_1.Validators.required],
            country: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(8)]],
            confirmPassword: ['', [forms_1.Validators.required, this.matchValues('password')]]
        });
        this.registerForm.controls['password'].valueChanges.subscribe({
            next: function () { return _this.registerForm.controls['confirmPassword'].updateValueAndValidity(); }
        });
    };
    RegisterComponent.prototype.matchValues = function (matchTo) {
        return function (control) {
            var _a, _b;
            return control.value === ((_b = (_a = control.parent) === null || _a === void 0 ? void 0 : _a.get(matchTo)) === null || _b === void 0 ? void 0 : _b.value) ? null : { isMatching: true };
        };
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var _a;
        var dob = this.getDateOnly((_a = this.registerForm.get('dateOfBirth')) === null || _a === void 0 ? void 0 : _a.value);
        this.registerForm.patchValue({ dateOfBirth: dob });
        this.accountService.register(this.registerForm.value).subscribe({
            next: function (_) { return _this.router.navigateByUrl('/members'); },
            error: function (error) { return _this.validationErrors = error; }
        });
    };
    RegisterComponent.prototype.cancel = function () {
        this.cancelRegister.emit(false);
    };
    RegisterComponent.prototype.getDateOnly = function (dob) {
        if (!dob)
            return;
        return new Date(dob).toISOString().slice(0, 10);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            standalone: true,
            templateUrl: './register.component.html',
            styleUrl: './register.component.css',
            imports: [forms_1.ReactiveFormsModule, common_1.NgIf, text_input_component_1.TextInputComponent, date_picker_component_1.DatePickerComponent]
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
