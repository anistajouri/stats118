import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import {DEPARTMENT_ROUTES} from './departement.routing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DepartementComponent } from 'app/departement/departement.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MychartsModule,
    RouterModule.forChild(DEPARTMENT_ROUTES),
    BsDatepickerModule.forRoot(),
    NgCircleProgressModule.forRoot({ }),
   FormsModule, ReactiveFormsModule,
   
    MatDialogModule,
  ],
  declarations: [
    DepartementComponent,
    
  ],
  exports: [
    DepartementComponent,
    BsDatepickerModule,
    RouterModule
  ]
})
export class DepartementModule { }