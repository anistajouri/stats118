import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import {DEVICE_ROUTES} from './device.routing'
import { DeviceComponent } from './device.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(DEVICE_ROUTES),
    BsDatepickerModule.forRoot(),
    MychartsModule,
    ChartsModule
  ],
  declarations: [
    DeviceComponent,
    
  ],
  exports: [
    DeviceComponent,
    BsDatepickerModule,
  ]
})
export class DeviceModule { }
