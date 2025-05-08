"use strict";
exports.__esModule = true;
exports.authGuardGuard = void 0;
var account_service_1 = require("../_services/account.service");
var core_1 = require("@angular/core");
var ngx_toastr_1 = require("ngx-toastr");
exports.authGuardGuard = function (route, state) {
    var accountService = core_1.inject(account_service_1.AccountService);
    var toaster = core_1.inject(ngx_toastr_1.ToastrService);
    if (accountService.currentUser()) {
        return true;
    }
    else {
        toaster.error("You are not logged in");
        return false;
    }
};
