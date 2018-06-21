import { Component, OnInit, SimpleChanges, ViewChild, IterableDiffers, Inject } from '@angular/core';
import {Input, ElementRef} from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { EventEmitter } from 'selenium-webdriver';

import * as jsPDF  from 'jspdf';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DeviceService } from 'app/shared/services/device.service';
import { LocalityService } from 'app/shared/services/locality.service';

declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: 'app-dialogmap',
  templateUrl: './dialogmap.component.html',
  styleUrls: ['./dialogmap.component.css']
})
export class Dialogmap  implements OnInit{
 // devices pie chart
 devices: Array<any>;
 keys: Array<string>;
 public pieChartLabels:string[];
 public pieChartData:number[];
//list
 docs: Array<any>;
 //
  public barChartLabels:string[] = [];

  public barChartData:any[] = [
  ];
 
constructor( @Inject(MAT_DIALOG_DATA) public data : any,private deviceService: DeviceService,private localityService: LocalityService) { }

  ngOnInit(): void {

this.setdevicespie(this.data.type_rech,this.data.dep_clicked,this.data.date_d, this.data.date_f);
this.setgrpcategbar(this.data.type_rech,this.data.dep_clicked,this.data.date_d, this.data.date_f);
this.setlist(this.data.type_int,this.data.dep_clicked, this.data.date_d, this.data.date_f);




   
    /*const myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    const mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
            {'featureType': 'water', 'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]},
            {'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{'hue': '#ff0000'},
            {'saturation': -100}, {'lightness': 99}]},
            {'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#808080'},
            {'lightness': 54}]},
            {'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ece2d9'}]},
            {'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ccdca1'}]},
            {'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{'color': '#767676'}]},
            {'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{'color': '#ffffff'}]},
            {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]},
            {'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{'visibility': 'on'},
            {'color': '#b8cb93'}]},
            {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]},
            {'featureType': 'poi.sports_complex', 'stylers': [{'visibility': 'on'}]},
            {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]},
            {'featureType': 'poi.business', 'stylers': [{'visibility': 'simplified'}]}
        ]
    };
    const map = new google.maps.Map(document.getElementById('maploc'), mapOptions);
    const Marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Hello World!'
    });
// To add the marker to the map, call setMap();
Marker.setMap(map);
console.log("nohnoh" +map.center);*/
}

setlist(type_int,dep,date_debut, date_fin)
{ this.docs = new Array();
    
    this.localityService.getAlllocality_df(dep,date_debut, date_fin).subscribe(data => {
     
        console.log("nombre de points "+data.length);
        setTimeout(function () {
          
        }, 100);
        
  
        for( var  k = 0;  k < data.length; k++){
        for (var i = 0; i < data[k]['hits']['hits'].length; i++) {
        //console.log(data[k]['hits']['hits'][i]['_source']['geocode']);
        //var arraylatlong_str = data[k]['hits']['hits'][i]['_source']['geocode'];
          var doc = data[k]['hits']['hits'][i]['_source'];
         // doc['timestamp'] = doc['@timestamp'];
          this.docs.push(doc);
        
  
  
        
        }
  
       
      }
        
      }, error => {
  
      });
     // console.log("mes points "+JSON.stringify(this.points));
      
    
}

setdevicespie(type,dep,date_deb, date_fin){
    this.pieChartLabels =  new Array();
    this.pieChartData = new Array();
    this.deviceService.getalldevicesperdept(type,dep,date_deb, date_fin).subscribe(data => {
        console.log("data nn"+ JSON.stringify(data))
         for (let key in data) {
             if(key != "sum"){
           this.pieChartLabels.push(key)
           this.pieChartData.push(data[key]);
        }
         }
        
    
         setTimeout(function () {
           
         }, 100);
         
    
         
         
       
     });
}

setgrpcategbar(type,dep,date_deb, date_fin){
    var data1 = new Array<number>();
    this.barChartLabels = new Array();
    this.deviceService.getallgrpcategperdept(type,dep,date_deb,date_fin).subscribe(data => {
      console.log("data "+ JSON.stringify(data))
       
       for (let key in data) {
           this.barChartLabels.push(key);
         data1.push(data[key]);
      }
  
       setTimeout(function () {
         
       }, 100);
       
  
       
       
     
   });
    var elmt1 =
    //this.barChartLabels =  ["op14wdb1","op14wdb2","op14wdb3","op14wdb4","op14wdb5"];
    this.barChartData =  [
        {data: data1, label: 'Nombre de recherches'}];
}

@ViewChild('liste') liste: ElementRef;

pdf()
{
  let doc = new jsPDF();




  const elementToPrint = document.getElementById('myliste'); //The html element to become a pdf
const pdf = new jsPDF('p', 'pt', 'a4');
pdf.addHTML(elementToPrint, () => {
    doc.save('web.pdf');
});
}

  




  

 

}
