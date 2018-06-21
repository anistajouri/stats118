import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MapdepartementsComponent } from 'app/mycharts/mapdepartements/mapdepartements.component';
import { PiechartComponent } from 'app/mycharts/piechart/piechart.component';
import { ChartsModule } from 'ng2-charts';
import { BarchartComponent } from 'app/mycharts/barchart/barchart.component';
import { Dialogmap } from 'app/mycharts/dialogmap/dialogmap.component';
import { MatDialogModule } from '@angular/material';
import { PiechartdialogComponent } from 'app/mycharts/piechartdialog/piechartdialog.component';
import { DoughnutchartComponent } from 'app/mycharts/doughnutchart/doughnutchart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgCircleProgressModule.forRoot({ }),
    ChartsModule,
    MatDialogModule,
    
  ],
  declarations: [
    MapdepartementsComponent,
    PiechartComponent,
    BarchartComponent,
    Dialogmap,
    PiechartdialogComponent,
    DoughnutchartComponent
  ],
  exports: [
    MapdepartementsComponent,
    PiechartComponent,
    BarchartComponent,
    Dialogmap,
    PiechartdialogComponent,
    DoughnutchartComponent
  ],
    
    entryComponents: [Dialogmap,PiechartComponent,PiechartdialogComponent]

})
export class MychartsModule { }
