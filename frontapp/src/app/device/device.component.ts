import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../shared/services/device.service';



@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
   mobile_str = "Mobile";
   desktop_str = "Desktop";
   public pieChartLabels0:string[];
   public pieChartData0:number[] = [];
   public pieChartLabels:string[];
   public pieChartData:number[] = [];
   public pieChartLabels1:string[];
   public pieChartData1:number[] = [];
   public pieChartLabels1l:string[];
   public pieChartData1l:number[] = [];
   public pieChartLabels2l:string[];
   public pieChartData2l:number[] = [];
   public pieChartLabels1p:string[];
   public pieChartData1p:number[] = [];
   public pieChartLabels2p:string[];
   public pieChartData2p:number[] = [];
   public pieChartLabels1r:string[];
   public pieChartData1r:number[] = [];
   public pieChartLabels2r:string[];
   public pieChartData2r:number[] = [];
   public pieChartLabels1c:string[];
   public pieChartData1c:number[] = [];
   public pieChartLabels2c:string[];
   public pieChartData2c:number[] = [];
   
  constructor(private deviceService: DeviceService) { 
    
  }

 

 

  ngOnInit() {
   
    //this.pieChartLabels = ['mobile','desktop' , 'unknown'];
    this.mobile_str = "mobile";
   
    
   // this.loadalldevicesperweek();
    
  }

 /* loadalldevicesperweek() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    
     this.deviceService.getalldevicesperweek().subscribe(data => {
      setTimeout(function () {
        
      }, 100);
      console.log("pie data: "+ JSON.stringify(data));
      //for previous week
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
      for(var key in data["previous_week"]){
        if(key != "sum"){
        this.pieChartLabels0.push(key);
        this.pieChartData0.push(data["previous_week"][key]);
        }
      this.pieChartData1 =  this.pieChartData0;
      this.pieChartLabels1 = this.pieChartLabels0;
        
       }

       //for this week
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
     for(var key in data["this_week"]){
      if(key != "sum"){
      this.pieChartLabels0.push(key);
      this.pieChartData0.push(data["this_week"][key]);
      }
      
     }
      this.pieChartData =  this.pieChartData0;
      this.pieChartLabels = this.pieChartLabels0;
      ///////////////////////////////////////////////////////////////////
      //for previous week functional type locality
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
      for(var key in data["previous_week_l"]){
        if(key != "sum"){
        this.pieChartLabels0.push(key);
        this.pieChartData0.push(data["previous_week_l"][key]);
        }
      this.pieChartData1l =  this.pieChartData0;
      this.pieChartLabels1l = this.pieChartLabels0;
        
       }

       //for this week  functional type locality
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
     for(var key in data["this_week_l"]){
      if(key != "sum"){
      this.pieChartLabels0.push(key);
      this.pieChartData0.push(data["this_week_l"][key]);
      }
      
     }
      this.pieChartData2l =  this.pieChartData0;
      this.pieChartLabels2l = this.pieChartLabels0;
      ///////////////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////////////
      //for previous week functional type proximity
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
      for(var key in data["previous_week_p"]){
        if(key != "sum"){
        this.pieChartLabels0.push(key);
        this.pieChartData0.push(data["previous_week_p"][key]);
        }
      this.pieChartData1p =  this.pieChartData0;
      this.pieChartLabels1p = this.pieChartLabels0;
        
       }

       //for this week  functional type proximity
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
     for(var key in data["this_week_p"]){
      if(key != "sum"){
      this.pieChartLabels0.push(key);
      this.pieChartData0.push(data["this_week_p"][key]);
      }
      
     }
      this.pieChartData2p =  this.pieChartData0;
      this.pieChartLabels2p = this.pieChartLabels0;
      ///////////////////////////////////////////////////////////////////
       ///////////////////////////////////////////////////////////////////
      //for previous week functional type reverse
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
      for(var key in data["previous_week_r"]){
        if(key != "sum"){
        this.pieChartLabels0.push(key);
        this.pieChartData0.push(data["previous_week_r"][key]);
        }
      this.pieChartData1r =  this.pieChartData0;
      this.pieChartLabels1r = this.pieChartLabels0;
        
       }

       //for this week  functional type proximity
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
     for(var key in data["this_week_r"]){
      if(key != "sum"){
      this.pieChartLabels0.push(key);
      this.pieChartData0.push(data["this_week_r"][key]);
      }
      
     }
      this.pieChartData2r =  this.pieChartData0;
      this.pieChartLabels2r = this.pieChartLabels0;
      ///////////////////////////////////////////////////////////////////
         ///////////////////////////////////////////////////////////////////
      //for previous week functional type crosslinking
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
      for(var key in data["previous_week_c"]){
        if(key != "sum"){
        this.pieChartLabels0.push(key);
        this.pieChartData0.push(data["previous_week_c"][key]);
        }
      this.pieChartData1c =  this.pieChartData0;
      this.pieChartLabels1c = this.pieChartLabels0;
        
       }

       //for this week  functional type proximity
      this.pieChartData0 = [];
      this.pieChartLabels0 = [];
     for(var key in data["this_week_c"]){
      if(key != "sum"){
      this.pieChartLabels0.push(key);
      this.pieChartData0.push(data["this_week_c"][key]);
      }
      
     }
      this.pieChartData2c =  this.pieChartData0;
      this.pieChartLabels2c = this.pieChartLabels0;
      ///////////////////////////////////////////////////////////////////
    }, error => {

    });
    
  }*/
  

}
