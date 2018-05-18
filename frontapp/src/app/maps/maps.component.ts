import { Component, OnInit, ViewChild } from '@angular/core';
import { MapService } from '../shared/services/mapservice';
import { Geocode } from '../shared/models/geocode';



declare const google: any;
interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    points : Array<Geocode>;
    bsValue = new Date();
    minDate = new Date(this.bsValue.getFullYear()-1,this.bsValue.getMonth(),1);
    maxDate = new Date();


  constructor(private mapService: MapService) { 
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

  ngOnInit() {
     //this.points = new Array<Geocode>();
     this.onValueChange(this.bsValue);
    
  }

  onValueChange(value: Date): void {
    this.points = new Array<Geocode>();
    var df_str = value.toLocaleString();
    var df_str_splited = df_str.split(",", 2);
    var d = this.formatDate(df_str_splited[0]);
    var f = this.formatDate(df_str_splited[1]);
    this.loadAllgeocodeswithproximity_df(d,f);
    
    
    
  }


  loadAllgeocodeswithproximity_df(date_debut, date_fin) {
    const baseContext = this;
     this.mapService.getAllwithproximity_df(date_debut, date_fin).subscribe(data => {
     
      console.log("nombre de points "+data.length);
      setTimeout(function () {
        
      }, 100);
      

      for( var  k = 0;  k < data.length; k++){
      for (var i = 0; i < data[k]['hits']['hits'].length; i++) {
      console.log(data[k]['hits']['hits'][i]['_source']['geocode']);
      var arraylatlong_str = data[k]['hits']['hits'][i]['_source']['geocode'];
      var timestamp = data[k]['hits']['hits'][i]['_source']['@timestamp'];
      var arraylatlong = arraylatlong_str.split(",");
      var time = timestamp.split(".");
      console.log(arraylatlong);
      var lat = parseFloat(arraylatlong[0]);
      var long =  parseFloat(arraylatlong[1]);
      var geocode=  new Geocode(lat, long,time[0]);
      this.points.push(geocode);
      console.log("points "+JSON.stringify(this.points));
      }
    }
      
      this.initiate_map(this.points);
      
    }, error => {

    });
    console.log("mes points "+JSON.stringify(this.points));
    
  }

  initiate_map(points: Array<Geocode>)
  {
    const centreFrance = new google.maps.LatLng(47.069496, 2.417247);
    const mapOptions = {
        zoom: 6,
        center: centreFrance,
        scrollwheel: true, // we disable de scroll over the map, it is a really annoing when you scroll through page
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

    console.log("''''''"+JSON.stringify(points));
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    for (var i = 0; i < points.length; i++) {
      const myLatlng0 = new google.maps.LatLng(points[i].latitude,points[i].longitude);
      const Marker0 = new google.maps.Marker({
          position: myLatlng0,
          title: points[i].timestamp
      });

      
      Marker0.setMap(map);

    }
  }

}
