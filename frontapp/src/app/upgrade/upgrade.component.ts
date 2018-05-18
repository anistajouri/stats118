import { Component, OnInit } from '@angular/core';
import { Message } from 'app/shared/models';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
 
  public message : Message;
  public messages : Message[];


  constructor(){
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('bienvenue au 118712StatBot! Quelles statistiques voulez-vous savoir?', 'assets/images/bot.png', new Date())
    ];
  }

}
