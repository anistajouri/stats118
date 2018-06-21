"use strict";
var core_1 = require('@angular/core');
var ContextMenuItemDirective = (function () {
    function ContextMenuItemDirective(template) {
        this.template = template;
        this.divider = false;
        this.passive = false;
        this.enabled = true;
        this.visible = true;
        this.execute = new core_1.EventEmitter();
    }
    ContextMenuItemDirective.prototype.evaluateIfFunction = function (value, item) {
        if (value instanceof Function) {
            return value(item);
        }
        return value;
    };
    ContextMenuItemDirective.prototype.triggerExecute = function (item, $event) {
        if (!this.evaluateIfFunction(this.enabled, item)) {
            return;
        }
        this.execute.emit({ event: $event, item: item });
    };
    ContextMenuItemDirective.decorators = [
        { type: core_1.Directive, args: [{
                    /* tslint:disable:directive-selector-type */
                    selector: 'template[contextMenuItem]',
                },] },
    ];
    /** @nocollapse */
    ContextMenuItemDirective.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    ContextMenuItemDirective.propDecorators = {
        'divider': [{ type: core_1.Input },],
        'passive': [{ type: core_1.Input },],
        'enabled': [{ type: core_1.Input },],
        'visible': [{ type: core_1.Input },],
        'execute': [{ type: core_1.Output },],
    };
    return ContextMenuItemDirective;
}());
exports.ContextMenuItemDirective = ContextMenuItemDirective;
