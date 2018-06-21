import { ContextMenuComponent } from '../angular2-contextmenu';
import { Subject } from 'rxjs/Rx';
export interface IContextMenuClickEvent {
    actions?: any[];
    contextMenu?: ContextMenuComponent;
    event: MouseEvent;
    item: any;
}
export declare class ContextMenuService {
    show: Subject<IContextMenuClickEvent>;
}
