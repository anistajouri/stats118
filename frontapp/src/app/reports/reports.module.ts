import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import {REPORTS_ROUTES} from './reports.routing'
import { ReportsComponent } from './reports.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(REPORTS_ROUTES),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    ReportsComponent,
    
  ],
  exports: [
    ReportsComponent,
    BsDatepickerModule,
    RouterModule
  ]
})
export class ReportsModule { }
