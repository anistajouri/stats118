import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MessageFormComponent } from 'app/components/message-form/message-form.component';
import { MessageItemComponent } from 'app/components/message-item/message-item.component';
import { MessageListComponent } from 'app/components/message-list/message-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
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
