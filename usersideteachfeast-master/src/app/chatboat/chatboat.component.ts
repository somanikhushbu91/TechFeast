import { Component, OnInit, ElementRef, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { ChatboatDataService } from './chatboat-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Message } from './message';

@Component({
  selector: 'app-chatboat',
  templateUrl: './chatboat.component.html',
  styleUrls: ['./chatboat.component.css']
})
export class ChatboatComponent implements OnInit {

  user : any;
  public message : Message;
  public messages : Message[];

  // Code for Scrolling
  @ViewChild('chatlist', { read: ElementRef }) chatList: ElementRef;
  @ViewChildren(ChatboatComponent, { read: ElementRef }) chatItems: QueryList<ChatboatComponent>;

  constructor(public chatService : ChatboatDataService, public router: Router,public dialogref:MatDialogRef<ChatboatComponent>)
  {
  	this.message = new Message('', '../../assets/user.jpg', new Date());
  	this.messages = [
  	  new Message('Welcome to Esplandido', '../../assets/bot.png', new Date())
  	];
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.chatItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  sendMessage(){
    this.message["timestamp"] = new Date();
    this.messages.push(this.message);

    this.chatService.getResponse(this.message["content"]).subscribe(res => {
      console.log(res);
      this.messages.push(
        new Message(res.result.fulfillment.speech, '../../assets/bot.png' ,res.timestamp)
      );
      this.scrollToBottom();
    });

    this.message = new Message('', '../../assets/user.jpg', new Date);
  }

  public scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    }
    catch (err) {
      console.log('Could not find the "chatList" element.');
    }
  }
  onClose() {
    this.dialogref.close();
  }
}
