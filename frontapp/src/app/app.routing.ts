import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { FulllayoutComponent } from 'app/full-layout/fulllayout.component';


export const APP_ROUTES: Routes =[

  {path: '',
  component: FulllayoutComponent,
  children: [

    { path: 'proximite', loadChildren: "./proximity/proximity.module#ProximityModule" },
    {path: 'localite', loadChildren: "./locality/locality.module#LocalityModule"},
    {path: 'device', loadChildren: "./device/device.module#DeviceModule"},
    {path: 'profile', loadChildren: "./profile/profile.module#ProfileModule"},
    {path: 'reports', loadChildren: "./reports/reports.module#ReportsModule"},
    {path: 'profiles', loadChildren: "./profiles/profiles.module#ProfilesModule"},
    {path: 'cluster', loadChildren: "./cluster/cluster.module#ClusterModule"},
    {path: 'departproxi', loadChildren: "./departement/departement.module#DepartementModule"},
    {path: 'bot', loadChildren: "./statbot/statbot.module#StatbotModule"},
    

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
