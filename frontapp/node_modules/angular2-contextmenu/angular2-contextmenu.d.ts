import { IContextMenuOptions } from './src/contextMenu.options';
import { ModuleWithProviders } from '@angular/core';
export * from './src/contextMenu.component';
export * from './src/contextMenu.service';
export declare class ContextMenuModule {
    static forRoot(options: IContextMenuOptions): ModuleWithProviders;
}
export default ContextMenuModule;
