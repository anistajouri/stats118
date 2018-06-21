import { Component, OnInit, ViewChild, IterableDiffers } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ClusterService } from 'app/shared/services/cluster.service';
declare var $: any;
@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {
  bsValue = new Date();
  minDate = new Date(this.bsValue.getFullYear()-1,this.bsValue.getMonth(),1);
  maxDate = new Date();
  formated_date: string;


  //weekly bar  chart
  public barChartLabels:string[] = [];

  public barChartData:any[] = [
    {data: [], label: 'Semaine dernière'},
    {data: [], label: 'cette semaine'}
  ];
// daily pie chart
   clusters: Array<any>;
   keys: Array<string>;
   public pieChartLabels:string[];
   public pieChartData:number[];

//times
times: Array<any>;
timeskeys: Array<string>;

//status
status: Array<any>;
statuskeys: Array<string>;
statustemp: Array<any>;
labels:Array<string>;
public doughnutChartType:string = 'doughnut';
@ViewChild(BaseChartDirective) baseChart: BaseChartDirective;
//weekly
data1: Array<number>;
data2: Array<number>;
   constructor(differs: IterableDiffers, private clusterService: ClusterService) { 
    //this.differ = differs.find([]).create(null);
    
    
  }
  
  ngOnInit() {
this.loadweeklycomparaison();
this.onValueChange(this.bsValue);

  }

  loadweeklycomparaison(){
    var data1 = new Array<number>();
    var data2 = new Array<number>();
    this.barChartLabels = new Array();
    this.clusterService.getweeklycomparaison().subscribe(data => {
      console.log("data "+ JSON.stringify(data))
       for (let key in data["this_week"]) {
         this.barChartLabels.push(key)
         data2.push(data["this_week"][key]);
       }
       for (let key in data["previous_week"]) {
        data1.push(data["previous_week"][key]);
      }
  
       setTimeout(function () {
         
       }, 100);
       
  
       
       
     
   });
    var elmt1 =
    //this.barChartLabels =  ["op14wdb1","op14wdb2","op14wdb3","op14wdb4","op14wdb5"];
    this.barChartData =  [{ data:data1, label: 'semaine dernière'},
    {data:data2, label: 'cette semaine'}];
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
    this.keys = new Array<string>();
    this.clusters = new Array<any>();
    var value_str = value.toLocaleString();
    var date_str = this.formatDate(value_str); 
    this.loadClusters(date_str);
    this.loadclustersresptimes(date_str);
    this.loadclustersrespstatus(date_str);
    
    
    
    
  } 

  loadClusters(date) {
    this.clusterService.getAllClusters(date).subscribe(data => {
    console.log("data "+ JSON.stringify(data))
     this.clusters = data;
     for (let key in this.clusters) {
         if(key != "sum")
       this.keys.push(key);
     }
     this.setpiedata();

     console.log("keys "+ JSON.stringify(this.keys))
     setTimeout(function () {
       
     }, 100);
     

     
     
   
 });
 }


 loadclustersresptimes(date) {
    this.times = new Array();
    this.timeskeys = new Array();
  this.clusterService.getclustersresptimes(date).subscribe(data => {
  console.log("data times "+ JSON.stringify(data))
   this.times = data;
   for (let key in this.times) {
     this.timeskeys.push(key);
   }
  

   console.log("keys "+ JSON.stringify(this.keys))
   setTimeout(function () {
     
   }, 100);
   

   
   
 
});
}

loadclustersrespstatus(date) {
this.labels= ["OK","KO"];
this.statuskeys = new Array();
this.clusterService.getclustersrespstatus(date).subscribe(data => {
console.log("data times "+ JSON.stringify(data))
 this.status = data;
 for (let key in this.status) {
  this.statuskeys.push(key);
  this.statustemp =  new Array();
  this.statustemp.push(this.status[key]["OK"]);
  this.statustemp.push(this.status[key]["KO"]);
  this.status[key]=this.statustemp;
}

 console.log("keys "+ JSON.stringify(this.keys))
 setTimeout(function () {
   
 }, 100);
 

 
 

});
}





 setpiedata()
 {this.pieChartData = new Array<number>();
  this.pieChartLabels = new Array<string>();

   for(var i=0; i< this.keys.length; i++)
{
  this.pieChartLabels.push(this.keys[i]);
  this.pieChartData.push(this.clusters[this.keys[i]]);
}}



    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
   
  


  
   // events
   


  private doughnutChartColors: any[] = [{ backgroundColor: ["#64daed", "#92d17c", "#cccccc", "#f16e00","#a4add3"] }];

}
