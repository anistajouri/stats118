"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var ContextMenuService = (function () {
    function ContextMenuService() {
        this.show = new Rx_1.Subject();
    }
    ContextMenuService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ContextMenuService.ctorParameters = function () { return []; };
    return ContextMenuService;
}());
exports.ContextMenuService = ContextMenuService;
