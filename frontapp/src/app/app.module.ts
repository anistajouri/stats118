import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { DialogflowService } from 'app/shared/services';
import { MapService } from 'app/shared/services/mapservice';
import { StorageService } from 'app/shared/services/storage.service';
import { LocalityService } from 'app/shared/services/locality.service';
import { LocalityModule } from 'app/locality/locality.module';
import { AuthService } from 'app/shared/services/auth.service';
import { FulllayoutModule } from 'app/full-layout/fulllayout.module';
import { ProximityModule } from 'app/proximity/proximity.module';

import {APP_ROUTES} from "./app.routing";
import { ProximityService } from 'app/shared/services/proximity.service';
import { DeviceService } from 'app/shared/services/device.service';
import { DeviceModule } from 'app/device/device.module';
import { ChartsModule } from 'ng2-charts';
import { ProfileService } from 'app/shared/services/profile.service';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    MychartsModule,
    RouterModule,
    AppRoutingModule,
    LocalityModule,
    ProximityModule,
    DeviceModule,
    FulllayoutModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    ChartsModule
  ],
  providers: [
  AuthService,
  DialogflowService,
  MapService,
  StorageService,
  LocalityService,
  ProximityService,
  DeviceService,
  ProfileService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
