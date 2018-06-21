import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { STATBOT_ROUTES} from './statbot.routing'
import { StatbotComponent } from './statbot.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComponentsModule } from 'app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(STATBOT_ROUTES),
    BsDatepickerModule.forRoot(),
    ComponentsModule
  ],
  declarations: [
    StatbotComponent,
    
  ],
  exports: [
    StatbotComponent,
    BsDatepickerModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StatbotModule { }
