import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ChatBgPage } from '../chat-bg/chat-bg';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  chat = "buying";

  constructor(public nav: NavController, public app: App) {

  }
  public openChat() {
    this.app.getRootNav().push(ChatPage);
  }
  public openChatBg() {
    this.app.getRootNav().push(ChatBgPage);
  }

}
