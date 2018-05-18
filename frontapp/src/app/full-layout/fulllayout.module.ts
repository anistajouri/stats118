import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { FulllayoutComponent } from 'app/full-layout/fulllayout.component';
import { MychartsModule } from 'app/mycharts/mycharts.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
