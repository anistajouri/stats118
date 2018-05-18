import { Component, OnInit, Input } from '@angular/core';
import { Locality } from 'app/shared/models/locality';

@Component({
  selector: 'locality-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() docs: Array<any>;
  @Input() name_dep: string;
  @Input() numb: number;



  constructor(){}

 

  ngOnInit(){
   
  }
}