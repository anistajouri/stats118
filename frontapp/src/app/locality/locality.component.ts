import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Geocode } from '../shared/models/geocode';
import { LocalityService } from 'app/shared/services/locality.service';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
import { Key } from 'selenium-webdriver';
import { Locality } from '../shared/models/locality';

declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.css']
})
export class LocalityComponent implements OnInit {
  points : Array<Geocode>;
  localities : Locality[];
  bsValue = new Date();
  minDate = new Date(this.bsValue.getFullYear()-1,this.bsValue.getMonth(),1);
  maxDate = new Date();
  percentages = {};
  //dep_clicked:  number;
  date_d: string;
  date_f: string;
  docs : Array<any>;
  name_dep: string;
  numb: number;
  dephovered: string;
  

  constructor(private localityService: LocalityService) { 
    this.bsValue = new Date();
  }

  formatDate(value: String){
    var res = value.split("/", 3);
    var res_y = res[2].split(" ");
    console.log("dd: "+res[0]);
    console.log("mm: "+res[1]);
    console.log("yyyy: "+res_y[0]);
    var proximity_date = res_y[0] + "-" + res[1] + "-" + res[0];
    console.log("proximity_date: "+proximity_date);
    return proximity_date;
  }

  formateRangeDate(date: Date){
    var range = []
    var df_str = date.toLocaleString();
    var df_str_splited = df_str.split(",", 2);
    var d = this.formatDate(df_str_splited[0]);
    var f = this.formatDate(df_str_splited[1]);
    range[0] = d;
    range[1] = f
    return range
  }

  ngOnInit() {
   this.docs = new Array<any>();
  this.onValueChange(this.bsValue);
  }


  onValueChange(value: Date): void {
    this.points = new Array<Geocode>();
    var range = this.formateRangeDate(value);
    this.date_d = range[0];
    this.date_f = range[1];
    //this.loadAlllocality_df(this.date_d,this.date_f, this.dep_clicked);
    this.loadPercentagePerDepartment_df(this.date_d,this.date_f);
    
    
  } 
  
  changename_dep(name_dep){
    this.name_dep = name_dep;
  }
  
  /*loadAlllocality_df(date_debut, date_fin, dep_clicked) {
    const baseContext = this;
     this.localityService.getAlllocality_df(date_debut, date_fin).subscribe(data => {
     
      console.log("nombre de points "+data.length);
      setTimeout(function () {
        
      }, 100);
      

      for( var  k = 0;  k < data.length; k++){
      for (var i = 0; i < data[k]['hits']['hits'].length; i++) {
      console.log(data[k]['hits']['hits'][i]['_source']['geocode']);
      var arraylatlong_str = data[k]['hits']['hits'][i]['_source']['geocode'];
      if(parseInt(data[k]['hits']['hits'][i]['_source']['county']) == dep_clicked){
        var doc = data[k]['hits']['hits'][i]['_source'];
        doc['timestamp'] = doc['@timestamp'];
        this.docs.push(doc);
      


      }
      }

     
    }
      
      this.initiate_map(this.docs);
      
    }, error => {

    });
    console.log("mes points "+JSON.stringify(this.points));
    
  }*/

  loadPercentagePerDepartment_df(date_debut, date_fin) {
    const baseContext = this;
    
     this.localityService.getPercentagePerDepartment_df(date_debut, date_fin).subscribe(data => {
     
      //console.log("nombre de points "+data.length);
      setTimeout(function () {
        
      }, 100);
      this.percentages = data;
  
      
    }, error => {

    });
    
  }

  display_tab_googlemaps(dep_clicked,name_dep){
    this.docs = new Array<any>();
   // this.loadAlllocality_df(this.date_d, this.date_f, dep_clicked);
    console.log("dep_clicked: "+ dep_clicked);
    this.name_dep = name_dep;
    console.log("44444444444"+ this.name_dep)

    
  }


  initiate_map(docs: Array<any>)
  {
    const centreFrance = new google.maps.LatLng(47.069496, 2.417247);
    const mapOptions = {
        zoom: 6,
        center: centreFrance,
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

    console.log("''''''"+JSON.stringify(docs));
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (var i = 0; i < docs.length; i++) {
      var latlong_str = docs[i]['geocode'];
      var arraylatlong = latlong_str.split(",");
      var lat = parseFloat(arraylatlong[0]);
      var long =  parseFloat(arraylatlong[1]);
      var timestamp = docs[i]['@timestamp'];
      var name_loc = docs[i]['name_loc'];
      var code_loc = docs[i]['locality'];
      var profile = docs[i]['profile'];
      var device = docs[i]['device'];
      var name_categ = docs[i]['name_categ'];
      var name_fam = docs[i]['name_fam'];
      var name_grp = docs[i]['name_grp'];
      const myLatlng0 = new google.maps.LatLng(lat,long);
      const Marker0 = new google.maps.Marker({
          position: myLatlng0,
          map: map,
         
          
      });

      var contentString = '<div class="tim-typo">'+
      '<p class="text-info">Date&Heure: '+timestamp +'</p>'+
      '<p class="text-info">Localité: '+name_loc +'</p>'+
      '<p class="text-info">Code Localité: '+code_loc +'</p>'+
      '<p class="text-info">Profile: '+profile +'</p>'+
      '<p class="text-info">Device: '+device +'</p>'+
      '<p class="text-info">Catégorie: '+name_categ +'</p>'+
      '<p class="text-info">Famille: '+name_fam +'</p>'+
      '<p class="text-info">Groupe: '+name_grp +'</p>'+
      '</div>'
      
  

     // var serert_msg = timestamp + "\n" + profile + device + "\n" + name_categ + "\n" + name_fam
      attachSecretMessage(Marker0, contentString);

    }
 
    function attachSecretMessage(marker, secretMessage) {
      var infowindow = new google.maps.InfoWindow({
        content: secretMessage
      });
    
      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    }


    this.numb = this.docs.length;
  }


}
