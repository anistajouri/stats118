import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MychartsModule } from 'app/mycharts/mycharts.module';
import { ComponentsModule } from 'app/components/components.module';
import { TeamlistComponent } from 'app/team/teamlist/teamlist.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    ComponentsModule
  ],
  declarations: [
    TeamlistComponent
    
  ],
  exports: [
    TeamlistComponent
  ],
  entryComponents: [TeamlistComponent]
})
export class TeamModule { }
