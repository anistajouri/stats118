import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'app/shared/models';
import { RasaService } from 'app/shared/services/rasa.service';
@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];

  constructor(private rasaService: RasaService) { }

  ngOnInit() {
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    //this.message = new Message('23341 recherches de proximites', 'assets/img/bot/bot.png',  new Date());
    //this.messages.push(this.message);
    
  
    this.rasaService.getResponse(this.message.content).subscribe(res => {
     this.messages.push(
       // new Message(res.tracker.slots.api_result, 'assets/img/bot/bot.png', new Date())
      );
    });

    this.message = new Message('', 'assets/images/user.png');
  }

}
