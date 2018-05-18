import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MapdepartementsComponent } from 'app/mycharts/mapdepartements/mapdepartements.component';
import { PiechartComponent } from 'app/mycharts/piechart/piechart.component';
import { ChartsModule } from 'ng2-charts';
import { BarchartComponent } from 'app/mycharts/barchart/barchart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgCircleProgressModule.forRoot({ }),
    ChartsModule
  ],
  declarations: [
    MapdepartementsComponent,
    PiechartComponent,
    BarchartComponent
  ],
  exports: [
    MapdepartementsComponent,
    PiechartComponent,
    BarchartComponent
  ]
})
export class MychartsModule { }
