import { Component, OnInit } from '@angular/core';
import { Geocode } from '../../shared/models/geocode';

@Component({
  selector: 'locality-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  geos: Geocode[];

  constructor(){}

 

  ngOnInit(){
    var g1  = new Geocode(10,11,"g1");
    var g2  = new Geocode(10,11,"g2");
    var g3  = new Geocode(10,11,"g3");
    var g4  = new Geocode(10,11,"g4");
  }
}