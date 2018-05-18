import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { FulllayoutComponent } from 'app/full-layout/fulllayout.component';


export const APP_ROUTES: Routes =[

  {path: '',
  component: FulllayoutComponent,
  children: [

    { path: 'proximite', loadChildren: "./proximity/proximity.module#ProximityModule" },
    {path: 'localite', loadChildren: "./locality/locality.module#LocalityModule"},
    {path: 'device', loadChildren: "./device/device.module#DeviceModule"},
    {path: 'profile', loadChildren: "./profile/profile.module#ProfileModule"},
    

  ],
 
},
    
    {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
];




@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  
  exports: [RouterModule,]
})
export class AppRoutingModule { }
