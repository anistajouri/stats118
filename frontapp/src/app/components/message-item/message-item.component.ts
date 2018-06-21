import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'app/shared/models';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input('message')
  private message: Message;
  public pieChartLabels:string[];
 public pieChartData:number[];
  constructor() { }

  ngOnInit() {
    this.pieChartLabels = ["nouha","sameh","ines"];
    this.pieChartData = [300,200,300]; 
    
  }

}
