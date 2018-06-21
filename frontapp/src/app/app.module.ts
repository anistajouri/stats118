import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { MapService } from 'app/shared/services/mapservice';
import { StorageService } from 'app/shared/services/storage.service';
import { LocalityService } from 'app/shared/services/locality.service';
import { LocalityModule } from 'app/locality/locality.module';
import { AuthService } from 'app/shared/services/auth.service';
import { FulllayoutModule } from 'app/full-layout/fulllayout.module';
import { ProximityModule } from 'app/proximity/proximity.module';
import { StatbotModule } from 'app/statbot/statbot.module';

import {APP_ROUTES} from "./app.routing";
import { ProximityService } from 'app/shared/services/proximity.service';
import { DeviceService } from 'app/shared/services/device.service';
import { DeviceModule } from 'app/device/device.module';
import { ChartsModule } from 'ng2-charts';
import { ProfileService } from 'app/shared/services/profile.service';
import { RasaService } from 'app/shared/services/rasa.service';
import { DepartementModule } from 'app/departement/departement.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContextMenuModule } from 'angular2-contextmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamModule } from 'app/team/team.module';
import { MatDialogModule } from '@angular/material';
import { ReportsModule } from 'app/reports/reports.module';
import { ProfilesModule } from 'app/profiles/profiles.module';
import { ProfilesService } from 'app/shared/services/profiles.service';
import { ClusterModule } from 'app/cluster/cluster.module';
import { ClusterService } from 'app/shared/services/cluster.service';
@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    

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
    ChartsModule,
    StatbotModule,
    DepartementModule,
    NgbModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    BrowserAnimationsModule,
    TeamModule,
    MatDialogModule,
    ReportsModule,
    ProfilesModule,
    ClusterModule
 
  ],
  providers: [
  AuthService,
  MapService,
  StorageService,
  LocalityService,
  ProximityService,
  DeviceService,
  ProfileService,
  RasaService,
  ProfilesService,
  ClusterService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
