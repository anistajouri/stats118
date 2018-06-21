import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { CLUSTER_ROUTES } from './cluster.routing'
import { ClusterComponent } from './cluster.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(CLUSTER_ROUTES),
    BsDatepickerModule.forRoot(),
    MychartsModule,
    FormsModule, ReactiveFormsModule,
    ChartsModule

  ],
  declarations: [
    ClusterComponent,
    
  ],
  exports: [
    ClusterComponent,
    BsDatepickerModule,
    RouterModule
  ]
})
export class ClusterModule { }
