import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessageFormComponent } from 'app/components/message-form/message-form.component';
import { MessageItemComponent } from 'app/components/message-item/message-item.component';
import { MessageListComponent } from 'app/components/message-list/message-list.component';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { ChartsModule } from 'ng2-charts';


//import notify from 'devextreme/ui/notify';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ChartsModule,
    MychartsModule
   
  ],
  declarations: [
    MessageFormComponent,
    MessageItemComponent,
    MessageListComponent
    
  ],
  exports: [
    MessageFormComponent,
    MessageItemComponent,
    MessageListComponent
  ]
})
export class ComponentsModule { }
