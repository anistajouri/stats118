"use strict";
var contextMenu_service_1 = require('./contextMenu.service');
var core_1 = require('@angular/core');
var ContextMenuAttachDirective = (function () {
    function ContextMenuAttachDirective(contextMenuService) {
        this.contextMenuService = contextMenuService;
    }
    ContextMenuAttachDirective.prototype.onContextMenu = function (event) {
        this.contextMenuService.show.next({
            contextMenu: this.contextMenu,
            event: event,
            item: this.contextMenuSubject,
        });
        event.preventDefault();
        event.stopPropagation();
    };
    ContextMenuAttachDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[contextMenu]',
                },] },
    ];
    /** @nocollapse */
    ContextMenuAttachDirective.ctorParameters = function () { return [
        { type: contextMenu_service_1.ContextMenuService, },
    ]; };
    ContextMenuAttachDirective.propDecorators = {
        'contextMenuSubject': [{ type: core_1.Input },],
        'contextMenu': [{ type: core_1.Input },],
        'onContextMenu': [{ type: core_1.HostListener, args: ['contextmenu', ['$event'],] },],
    };
    return ContextMenuAttachDirective;
}());
exports.ContextMenuAttachDirective = ContextMenuAttachDirective;
