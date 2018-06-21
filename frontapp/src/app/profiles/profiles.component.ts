import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfilesService } from 'app/shared/services/profiles.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { PiechartComponent } from 'app/mycharts/piechart/piechart.component';
import { Dialogmap } from 'app/mycharts/dialogmap/dialogmap.component';
import { PiechartdialogComponent } from 'app/mycharts/piechartdialog/piechartdialog.component';
import { ResetPasswordComponent } from 'app/auth/resetpassword/resetpassword.component';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  bsValue = new Date();
  minDate = new Date(this.bsValue.getFullYear()-1,this.bsValue.getMonth(),1);
  maxDate = new Date();
  profiles: any;
  keys: Array<string>;
  selectedRow: number;
  formated_date: string;

  constructor(private profilesService: ProfilesService, public dialog: MatDialog) { 
    this.keys =  new Array();
    this.onValueChange(this.bsValue);
  }


  ngOnInit() {
      this.onValueChange(this.bsValue);
  }

  formatDate(value: String){
    var res = value.split("/", 3);
    var res_y = res[2].split(" ");
    console.log("dd: "+res[0]);
    console.log("mm: "+res[1]);
    console.log("yyyy: "+res_y[0]);
    var proximity_date = res_y[0] + "-" + res[1] + "-" + res[0];
    console.log("proximity_date: "+proximity_date);
    this.formated_date = proximity_date;
    return proximity_date;
  }

  onValueChange(value: Date): void {
    var value_str = value.toLocaleString();
    var date_str = this.formatDate(value_str); 
    this.loadAllProfiles(date_str);
    
    
  } 

  loadAllProfiles(date) {
    this.keys = new Array<string>();
     this.profilesService.getAllProfiles(date).subscribe(data => {
     console.log("data "+ JSON.stringify(data))
      this.profiles = data;
      for (let key in this.profiles) {
          if(key != "sum")
        this.keys.push(key);
      }

      console.log("keys "+ JSON.stringify(this.keys))
      setTimeout(function () {
        
      }, 100);
      

      
      
    
  });
  }
 


  nodesforprofile(key: string, i: number){
      this.selectedRow = i;
   let dialogRef = this.dialog.open(PiechartdialogComponent, {
        panelClass: 'my-full-screen-dialogdep',
        data:{"key":key,
              "percent":this.profiles[key],
            "date": this.formated_date}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
}
