import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FulllayoutComponent } from 'app/full-layout/fulllayout.component';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamModule } from 'app/team/team.module';
import { AuthModule } from 'app/auth/auth.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule, NgbModule.forRoot(),
    TeamModule,
    AuthModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FulllayoutComponent
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FulllayoutComponent
  ]
})
export class FulllayoutModule { }
