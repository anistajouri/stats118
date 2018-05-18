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



  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges){
    this.pieChartLabels =[];
    this.pieChartLabels = ['mobile', 'desktop', 'unknown'];
    this.pieChartData = [];
    this.pieChartData = changes["pieChartData"]["currentValue"];

    this.baseChart.labels= this.pieChartLabels;
    this.baseChart.data= this.pieChartData;

    this.baseChart.ngOnChanges({} as SimpleChanges);

  
  }

  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
