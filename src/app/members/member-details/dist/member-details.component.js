"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberDetailsComponent = void 0;
var core_1 = require("@angular/core");
var member_service_1 = require("../../_services/member.service");
var router_1 = require("@angular/router");
var tabs_1 = require("ngx-bootstrap/tabs");
var ng_gallery_1 = require("ng-gallery");
var ngx_timeago_1 = require("ngx-timeago");
var common_1 = require("@angular/common");
var MemberDetailsComponent = /** @class */ (function () {
    function MemberDetailsComponent() {
        this.memberService = core_1.inject(member_service_1.MembersService);
        this.route = core_1.inject(router_1.ActivatedRoute);
        this.images = [];
    }
    MemberDetailsComponent.prototype.ngOnInit = function () {
        this.loadMember();
    };
    MemberDetailsComponent.prototype.loadMember = function () {
        var _this = this;
        var username = this.route.snapshot.paramMap.get('username');
        if (!username)
            return;
        this.memberService.getMember(username).subscribe({
            next: function (member) {
                _this.member = member;
                member.photos.map(function (p) {
                    _this.images.push(new ng_gallery_1.ImageItem({ src: p.url, thumb: p.url }));
                });
            }
        });
    };
    MemberDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-member-details',
            standalone: true,
            imports: [tabs_1.TabsModule, ng_gallery_1.GalleryModule, ngx_timeago_1.TimeagoModule, common_1.DatePipe],
            templateUrl: './member-details.component.html',
            styleUrl: './member-details.component.css'
        })
    ], MemberDetailsComponent);
    return MemberDetailsComponent;
}());
exports.MemberDetailsComponent = MemberDetailsComponent;
