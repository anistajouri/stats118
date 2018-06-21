"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var contextMenu_options_1 = require('./src/contextMenu.options');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var contextMenu_component_1 = require('./src/contextMenu.component');
var contextMenu_item_directive_1 = require('./src/contextMenu.item.directive');
var contextMenu_service_1 = require('./src/contextMenu.service');
var contextMenu_attach_directive_1 = require('./src/contextMenu.attach.directive');
__export(require('./src/contextMenu.component'));
__export(require('./src/contextMenu.service'));
var ContextMenuModule = (function () {
    function ContextMenuModule() {
    }
    ContextMenuModule.forRoot = function (options) {
        return {
            ngModule: ContextMenuModule,
            providers: [
                {
                    provide: contextMenu_options_1.CONTEXT_MENU_OPTIONS,
                    useValue: options,
                },
            ],
        };
    };
    ContextMenuModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        contextMenu_attach_directive_1.ContextMenuAttachDirective,
                        contextMenu_component_1.ContextMenuComponent,
                        contextMenu_item_directive_1.ContextMenuItemDirective,
                    ],
                    exports: [
                        contextMenu_attach_directive_1.ContextMenuAttachDirective,
                        contextMenu_component_1.ContextMenuComponent,
                        contextMenu_item_directive_1.ContextMenuItemDirective,
                    ],
                    imports: [
                        common_1.CommonModule,
                    ],
                    providers: [
                        contextMenu_service_1.ContextMenuService,
                    ],
                },] },
    ];
    /** @nocollapse */
    ContextMenuModule.ctorParameters = function () { return []; };
    return ContextMenuModule;
}());
exports.ContextMenuModule = ContextMenuModule;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContextMenuModule;
