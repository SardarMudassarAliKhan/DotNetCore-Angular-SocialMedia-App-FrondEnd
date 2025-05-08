"use strict";
exports.__esModule = true;
exports.jwtInterceptor = void 0;
var core_1 = require("@angular/core");
var account_service_1 = require("../_services/account.service");
exports.jwtInterceptor = function (req, next) {
    var _a;
    var accountService = core_1.inject(account_service_1.AccountService);
    if (accountService.currentUser()) {
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + ((_a = accountService.currentUser()) === null || _a === void 0 ? void 0 : _a.token)
            }
        });
    }
    return next(req);
};
