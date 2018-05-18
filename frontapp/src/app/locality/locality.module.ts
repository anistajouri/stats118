import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { LocalityComponent } from 'app/locality/locality.component';
import {LOCALITY_ROUTES} from './locality.routing'
import { ListComponent } from 'app/locality/list/list.component';
import { DetailComponent } from 'app/locality/detail/detail.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MychartsModule,
    RouterModule.forChild(LOCALITY_ROUTES),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    LocalityComponent,
    ListComponent,
    DetailComponent
    
  ],
  exports: [
    LocalityComponent,
    ListComponent,
    DetailComponent,
    BsDatepickerModule,
  ]
})
export class LocalityModule { }
