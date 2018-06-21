import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import {PROFILES_ROUTES} from './profiles.routing'
import { ProfilesComponent } from './profiles.component';
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
    RouterModule.forChild(PROFILES_ROUTES),
    BsDatepickerModule.forRoot(),
    MychartsModule,
    FormsModule, ReactiveFormsModule,
   

  ],
  declarations: [
    ProfilesComponent,
    
  ],
  exports: [
    ProfilesComponent,
    BsDatepickerModule,
    RouterModule
  ]
})
export class ProfilesModule { }
