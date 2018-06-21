import { Component, OnInit } from '@angular/core';
import { Message } from 'app/shared/models';

@Component({
  selector: 'app-statbot',
  templateUrl: './statbot.component.html',
  styleUrls: ['./statbot.component.css']
})
export class StatbotComponent {
 
  public message : Message;
  public messages : Message[];


  constructor(){
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('bienvenue au 118712StatBot! Quelles statistiques voulez-vous savoir?', 'assets/img/bot/bot.png', new Date())
    ];
  }

}
