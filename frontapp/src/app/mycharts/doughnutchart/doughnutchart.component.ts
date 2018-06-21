import { Component, OnInit, SimpleChanges, ViewChild, IterableDiffers } from '@angular/core';
import {Input} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.css']
})
export class DoughnutchartComponent implements OnInit,OnChanges {
  // Doughnut
  @Input() public doughnutChartLabels:string[];
  @Input() public doughnutChartData:number[];
  public doughnutChartType:string = 'doughnut';
 
  @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
  differ: any;
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  
   // events
   

  constructor(differs: IterableDiffers) { 
    this.differ = differs.find([]).create(null);
    
  }

  private doughnutChartColors: any[] = [{ backgroundColor: ["#64daed", "#92d17c", "#cccccc", "#f16e00","#a4add3"] }];



  ngOnInit() {

  }

 

  ngOnChanges(changes: SimpleChanges){
    //const doughnutChartLabels: SimpleChange = changes.doughnutChartLabels;
    this.doughnutChartLabels = new Array();
    this.doughnutChartLabels= changes["doughnutChartLabels"]["currentValue"];
    this.doughnutChartData = new Array();
    this.doughnutChartData= changes["doughnutChartData"]["currentValue"];
    console.log("changesssslab "+JSON.stringify(this.doughnutChartLabels));
    console.log("changessssdat "+JSON.stringify(this.doughnutChartData));

    this.baseChart.labels= this.doughnutChartLabels;
    this.baseChart.data= this.doughnutChartData;

    this.baseChart.ngOnChanges({} as SimpleChanges);
   // this.baseChart.chart.config.data.labels = this.doughnutChartLabels;
   // this.baseChart.chart.config.data.data = this.doughnutChartData;
    
  }


 

}
