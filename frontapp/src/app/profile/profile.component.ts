import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../shared/services/profile.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   public barChartLabels0:string[];
   public barChartData0:number[] = [];
   public barChartLabels1:string[];
   public barChartData1:number[] = [];
   public barChartLabels2:string[];
   public barChartData2:number[] = [];
  
   
  constructor(private profileService: ProfileService) { 
    
  }

 

 

  ngOnInit() {
    this.loadallprofilesperweek();
    
  }

  loadallprofilesperweek() {
    this.barChartLabels1 = [];
    this.barChartData1 = [];
    
     this.profileService.getallprofilesperweek().subscribe(data => {
      setTimeout(function () {
        
      }, 100);
      console.log("bar data: "+ JSON.stringify(data));
      //for previous week
      this.barChartData0 = [];
      this.barChartLabels0 = [];
      var gdata= []
      var content1= {};
      var contentdata1 = [];
      for(var key in data["previous_week"]){
        if(key != "sum"){
        this.barChartLabels0.push(key);
        contentdata1.push(data["previous_week"][key]);
        }
     
      
      
      
        
       }
       content1['label'] = "Semaine dernière" 
       content1['data'] = contentdata1;

       //for this week
      this.barChartData0 = [];
      this.barChartLabels0 = [];
      
      var content2= {};
      var contentdata2 = [];
      for(var key in data["this_week"]){
        if(key != "sum"){
        this.barChartLabels0.push(key);
        contentdata2.push(data["this_week"][key]);
        }
      
       }

       content2['label'] = "Cette semaine" 
       content2['data'] = contentdata2;
     
     //this.barChartLabels2 = this.barChartLabels0;
     gdata.push(content1);
     gdata.push(content2);

     this.barChartLabels1 = this.barChartLabels0;
     this.barChartData1 = gdata;
       
      ///////////////////////////////////////////////////////////////////
      
    
        
    }, error => {

    });
    
  }
  

}
