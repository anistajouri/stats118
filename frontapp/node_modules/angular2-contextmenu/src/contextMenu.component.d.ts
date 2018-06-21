import { ContextMenuItemDirective } from './contextMenu.item.directive';
import { IContextMenuOptions } from './contextMenu.options';
import { ContextMenuService, IContextMenuClickEvent } from './contextMenu.service';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, QueryList } from '@angular/core';
export interface ILinkConfig {
    click: (item: any, $event?: MouseEvent) => void;
    enabled?: (item: any) => boolean;
    html: (item: any) => string;
}
export interface MouseLocation {
    left?: string;
    marginLeft?: string;
    marginTop?: string;
    top?: string;
}
export declare class ContextMenuComponent implements AfterContentInit {
    private _contextMenuService;
    private changeDetector;
    private elementRef;
    private options;
    useBootstrap4: boolean;
    close: EventEmitter<any>;
    menuItems: QueryList<ContextMenuItemDirective>;
    menuElement: ElementRef;
    visibleMenuItems: ContextMenuItemDirective[];
    links: ILinkConfig[];
    isShown: boolean;
    isOpening: boolean;
    item: any;
    private mouseLocation;
    constructor(_contextMenuService: ContextMenuService, changeDetector: ChangeDetectorRef, elementRef: ElementRef, options: IContextMenuOptions);
    stopEvent($event: MouseEvent): void;
    readonly locationCss: any;
    clickedOutside(): void;
    ngAfterContentInit(): void;
    isMenuItemEnabled(menuItem: ContextMenuItemDirective): boolean;
    isMenuItemVisible(menuItem: ContextMenuItemDirective): boolean;
    evaluateIfFunction(value: any): any;
    isDisabled(link: ILinkConfig): boolean;
    execute(link: ILinkConfig, $event?: MouseEvent): void;
    onMenuEvent(menuEvent: IContextMenuClickEvent): void;
    setVisibleMenuItems(): void;
    showMenu(): void;
    hideMenu(event?: KeyboardEvent): void;
}
