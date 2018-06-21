import { Component, OnInit, SimpleChanges, ViewChild, IterableDiffers, Inject } from '@angular/core';
import {Input} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProfilesService } from 'app/shared/services/profiles.service';


@Component({
  selector: 'app-piechartdialog',
  templateUrl: './piechartdialog.component.html',
  styleUrls: ['./piechartdialog.component.css']
})
export class PiechartdialogComponent implements OnInit {
 
   // Pie
   public pieChartLabels:string[];
   public pieChartData:number[];
   public pieChartType:string = 'pie';
   public pieChartLabels1:string[];
   public pieChartData1:number[];
   @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;

   differ: any;
   // events
   

  constructor(differs: IterableDiffers, private profilesService: ProfilesService, @Inject(MAT_DIALOG_DATA) public data : any) { 
    this.differ = differs.find([]).create(null);
    
    
  }



  ngOnInit() {
   
    this.loadProfileHosts(this.data.date,this.data.key);
  }
  /*ngOnChanges(changes: SimpleChanges){
    console.log("here on ngonchanges");
    this.pieChartData = changes["pieChartData"]["currentValue"];

    this.pieChartLabels = changes.pieChartLabels.currentValue;
    this.pieChartData = changes.pieChartData.currentValue;
    this.baseChart.labels= this.pieChartLabels;
    this.baseChart.data= this.pieChartData;

    this.baseChart.ngOnChanges({} as SimpleChanges);

  
  }*/

  private doughnutChartColors: any[] = [{ backgroundColor: ["#64daed", "#92d17c", "#cccccc", "#f16e00","#a4add3","#005aff","#00ffa5","#ffd000","#ffc04d"] }];


  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  loadProfileHosts(date: string, profile: string)
  {this.pieChartData1 = new Array();
    this.pieChartLabels1 = new Array();
    this.profilesService.getAllProfilehosts(date,profile).subscribe(data => {
      console.log("data "+ JSON.stringify(data))
      for (let key in data) {
        if(key != "sum")
     { this.pieChartLabels1.push(key);
      this.pieChartData1.push(data[key]);
     }
    }
       setTimeout(function () {
     
       }, 100);
       
       this.setpiedata(this.pieChartLabels1,this.pieChartData1);
      
 
       
       
     
   });

  }
  setpiedata(labels, data){
    this.pieChartData = new Array();
    this.pieChartLabels = new Array();
    for(var i=0; i< labels.length; i++)
    {
      this.pieChartLabels.push(labels[i]);
    }
    for(var i=0; i< data.length; i++)
    {
      this.pieChartData.push(data[i]);
    }
      }


/*ngDoCheck() {
    var changes = this.differ.diff(this.pieChartLabels, this.pieChartData);
    if(changes) {
        console.log('changes detected'+ changes);
        //changes.forEachAddedItem(r => console.log('added ' + r.item));
       // this.pieChartLabels = this.pieChartLabels;
        //changes.forEachAddedItem(r => this.pieChartLabels.push(r.item));
        this.baseChart.labels= this.pieChartLabels;
        this.baseChart.data= this.pieChartData;
  
    } else {
        console.log('nothing changed');
    }

   
}*/
}
