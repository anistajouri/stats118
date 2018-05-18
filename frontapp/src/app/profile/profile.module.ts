import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { PROFILE_ROUTES} from './profile.routing'
import { ProfileComponent } from './profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forChild(PROFILE_ROUTES),
    BsDatepickerModule.forRoot(),
    MychartsModule,
    ChartsModule
  ],
  declarations: [
    ProfileComponent,
    
  ],
  exports: [
    ProfileComponent,
    BsDatepickerModule,
  ]
})
export class ProfileModule { }
