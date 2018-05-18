import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import {PROXIMITY_ROUTES} from './proximity.routing'
import { ProximityComponent } from './proximity.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(PROXIMITY_ROUTES),
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    ProximityComponent,
    
  ],
  exports: [
    ProximityComponent,
    BsDatepickerModule,
  ]
})
export class ProximityModule { }
