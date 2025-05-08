"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberEditComponent = void 0;
var core_1 = require("@angular/core");
var tabs_1 = require("ngx-bootstrap/tabs");
var forms_1 = require("@angular/forms");
var ngx_toastr_1 = require("ngx-toastr");
var account_service_1 = require("../../_services/account.service");
var member_service_1 = require("../../_services/member.service");
var photo_editor_component_1 = require("../photo-editor/photo-editor.component");
var MemberEditComponent = /** @class */ (function () {
    function MemberEditComponent() {
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.memberService = core_1.inject(member_service_1.MembersService);
        this.toastr = core_1.inject(ngx_toastr_1.ToastrService);
    }
    MemberEditComponent.prototype.notify = function ($event) {
        var _a;
        if ((_a = this.editForm) === null || _a === void 0 ? void 0 : _a.dirty) {
            $event.returnValue = true;
        }
    };
    MemberEditComponent.prototype.ngOnInit = function () {
        this.loadMember();
    };
    MemberEditComponent.prototype.loadMember = function () {
        var _this = this;
        debugger;
        var user = this.accountService.currentUser();
        if (!user)
            return;
        this.memberService.getMember(user.username).subscribe({
            next: function (member) { return _this.member = member; }
        });
    };
    MemberEditComponent.prototype.updateMember = function () {
        var _this = this;
        var _a;
        this.memberService.updateMember((_a = this.editForm) === null || _a === void 0 ? void 0 : _a.value).subscribe({
            next: function (_) {
                var _a;
                _this.toastr.success('Profile updated successfully');
                (_a = _this.editForm) === null || _a === void 0 ? void 0 : _a.reset(_this.member);
            }
        });
    };
    __decorate([
        core_1.ViewChild('editForm')
    ], MemberEditComponent.prototype, "editForm");
    __decorate([
        core_1.HostListener('window:beforeunload', ['$event'])
    ], MemberEditComponent.prototype, "notify");
    MemberEditComponent = __decorate([
        core_1.Component({
            selector: 'app-member-edit',
            standalone: true,
            imports: [tabs_1.TabsModule, forms_1.FormsModule, photo_editor_component_1.PhotoEditorComponent],
            templateUrl: './member-edit.component.html',
            styleUrl: './member-edit.component.css'
        })
    ], MemberEditComponent);
    return MemberEditComponent;
}());
exports.MemberEditComponent = MemberEditComponent;
