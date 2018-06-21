import { Component, OnInit, SimpleChanges, ViewChild, IterableDiffers } from '@angular/core';
import {Input} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit,OnChanges {
 
   // Pie
   @Input() public pieChartLabels:string[];
   @Input() public pieChartData:number[];
   public pieChartType:string = 'pie';
   @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
   differ: any;
  
   // events
   

  constructor(differs: IterableDiffers) { 
    this.differ = differs.find([]).create(null);
    
  }

  private doughnutChartColors: any[] = [{ backgroundColor: ["#64daed", "#92d17c", "#cccccc", "#f16e00","#a4add3","#005aff","#00ffa5","#ffd000","#ffc04d"] }];



  ngOnInit() {
    //this.pieChartLabels = ['mobile', 'desktop', 'unknown'];
   // this.pieChartData = [200,500,600];
   
  }

 

  ngOnChanges(changes: SimpleChanges){
    console.log("here from ngchanges pie chart");
    this.pieChartLabels = new Array();
    this.pieChartData = new Array();
    this.pieChartLabels = changes["pieChartLabels"]["currentValue"];
    this.pieChartData = changes["pieChartData"]["currentValue"];
    this.baseChart.labels= this.pieChartLabels;
    this.baseChart.data= this.pieChartData;
   // this.setpiedata(this.pieChartLabels, this.pieChartData);
    this.baseChart.ngOnChanges({} as SimpleChanges);

  
  }


  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
