"use strict";
exports.__esModule = true;
exports.loadingInterceptor = void 0;
var core_1 = require("@angular/core");
var busy_service_1 = require("../_services/busy.service");
var rxjs_1 = require("rxjs");
exports.loadingInterceptor = function (req, next) {
    var busyService = core_1.inject(busy_service_1.BusyService);
    busyService.busy();
    return next(req).pipe(rxjs_1.delay(1000), rxjs_1.finalize(function () {
        busyService.idle();
    }));
};
