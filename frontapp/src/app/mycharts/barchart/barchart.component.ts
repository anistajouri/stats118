import { Component, OnInit, SimpleChanges, ViewChild, IterableDiffers } from '@angular/core';
import {Input} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
 
   // Bar
   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @Input() public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  @Input() public barChartData:any[] = [
    {data: [], label: 'Semaine dernière'},
    {data: [], label: 'cette semaine'}
  ];
   @ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
  
   

   public chartColors: Array<any> = [
    { // first color
      backgroundColor: '#cccccc',
      borderColor: '#cccccc',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#f16e00',
      borderColor: '#f16e00',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];

  constructor() { 
    
  }



  ngOnInit() {
    //this.barChartLabels =  ["op14wdb1","op14wdb2","op14wdb3","op14wdb4","op14wdb5"];
   // this.barChartData =  [{data:[500,600,300,100,200,350], label: 'nombre de recherche'}];
  }

 ngOnChanges(changes: SimpleChanges){
    this.barChartLabels =[];
    this.barChartData = [];
    this.barChartLabels = changes["barChartLabels"]["currentValue"];
    this.barChartData = changes["barChartData"]["currentValue"];

    this.baseChart.labels= this.barChartLabels;
    this.baseChart.data= this.barChartData;

    this.baseChart.ngOnChanges({} as SimpleChanges);


  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
