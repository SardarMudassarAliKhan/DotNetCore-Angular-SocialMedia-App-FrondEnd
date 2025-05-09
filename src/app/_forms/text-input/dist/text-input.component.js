"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TextInputComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TextInputComponent = /** @class */ (function () {
    function TextInputComponent(ngControl) {
        this.ngControl = ngControl;
        this.label = core_1.input('');
        this.type = core_1.input('text');
        this.ngControl.valueAccessor = this;
    }
    TextInputComponent.prototype.writeValue = function (obj) {
    };
    TextInputComponent.prototype.registerOnChange = function (fn) {
    };
    TextInputComponent.prototype.registerOnTouched = function (fn) {
    };
    Object.defineProperty(TextInputComponent.prototype, "control", {
        get: function () {
            return this.ngControl.control;
        },
        enumerable: false,
        configurable: true
    });
    TextInputComponent = __decorate([
        core_1.Component({
            selector: 'app-text-input',
            standalone: true,
            imports: [common_1.NgIf, forms_1.ReactiveFormsModule],
            templateUrl: './text-input.component.html',
            styleUrl: './text-input.component.css'
        }),
        __param(0, core_1.Self())
    ], TextInputComponent);
    return TextInputComponent;
}());
exports.TextInputComponent = TextInputComponent;
