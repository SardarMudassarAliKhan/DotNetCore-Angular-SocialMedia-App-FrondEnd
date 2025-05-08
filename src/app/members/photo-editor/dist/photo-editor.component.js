"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhotoEditorComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_file_upload_1 = require("ng2-file-upload");
var environment_1 = require("../../../environments/environment");
var member_service_1 = require("../../_services/member.service");
var account_service_1 = require("../../_services/account.service");
var PhotoEditorComponent = /** @class */ (function () {
    function PhotoEditorComponent() {
        this.accountService = core_1.inject(account_service_1.AccountService);
        this.memberService = core_1.inject(member_service_1.MembersService);
        this.member = core_1.input.required();
        this.hasBaseDropZoneOver = false;
        this.baseUrl = environment_1.environment.apiUrl;
        this.memberChange = core_1.output();
    }
    PhotoEditorComponent.prototype.ngOnInit = function () {
        this.initializeUploader();
    };
    PhotoEditorComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoEditorComponent.prototype.deletePhoto = function (photo) {
        var _this = this;
        this.memberService.deletePhoto(photo).subscribe({
            next: function (_) {
                var updatedMember = __assign({}, _this.member());
                updatedMember.photos = updatedMember.photos.filter(function (x) { return x.id !== photo.id; });
                _this.memberChange.emit(updatedMember);
            }
        });
    };
    PhotoEditorComponent.prototype.setMainPhoto = function (photo) {
        var _this = this;
        this.memberService.setMainPhoto(photo).subscribe({
            next: function (_) {
                var user = _this.accountService.currentUser();
                if (user) {
                    user.photoUrl = photo.url;
                    _this.accountService.setCurrentUser(user);
                }
                var updatedMember = __assign({}, _this.member());
                updatedMember.photoUrl = photo.url;
                updatedMember.photos.forEach(function (p) {
                    if (p.isMain)
                        p.isMain = false;
                    if (p.id === photo.id)
                        p.isMain = true;
                });
                _this.memberChange.emit(updatedMember);
            }
        });
    };
    PhotoEditorComponent.prototype.initializeUploader = function () {
        var _this = this;
        var _a;
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: this.baseUrl + 'users/add-photo',
            authToken: 'Bearer ' + ((_a = this.accountService.currentUser()) === null || _a === void 0 ? void 0 : _a.token),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var photo = JSON.parse(response);
            var updatedMember = __assign({}, _this.member());
            updatedMember.photos.push(photo);
            _this.memberChange.emit(updatedMember);
        };
    };
    PhotoEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-editor',
            standalone: true,
            imports: [common_1.NgIf, common_1.NgFor, common_1.NgStyle, common_1.NgClass, ng2_file_upload_1.FileUploadModule, common_1.DecimalPipe],
            templateUrl: './photo-editor.component.html',
            styleUrl: './photo-editor.component.css'
        })
    ], PhotoEditorComponent);
    return PhotoEditorComponent;
}());
exports.PhotoEditorComponent = PhotoEditorComponent;
