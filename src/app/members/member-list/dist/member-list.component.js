"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberListComponent = void 0;
var core_1 = require("@angular/core");
var member_card_component_1 = require("../member-card/member-card.component");
var member_service_1 = require("../../_services/member.service");
var MemberListComponent = /** @class */ (function () {
    function MemberListComponent() {
        this.memberService = core_1.inject(member_service_1.MembersService);
    }
    MemberListComponent.prototype.ngOnInit = function () {
        this.loadMembers();
    };
    MemberListComponent.prototype.loadMembers = function () {
        this.memberService.getMembers();
    };
    MemberListComponent = __decorate([
        core_1.Component({
            selector: 'app-member-list',
            standalone: true,
            templateUrl: './member-list.component.html',
            styleUrl: './member-list.component.css',
            imports: [member_card_component_1.MemberCardComponent]
        })
    ], MemberListComponent);
    return MemberListComponent;
}());
exports.MemberListComponent = MemberListComponent;
