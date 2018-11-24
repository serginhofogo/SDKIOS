import { Component } from '@angular/core';
import { ProductsService } from '../../app/services/services';
import { NavController, App } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ChatBgPage } from '../chat-bg/chat-bg';

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {
  chat = "buying";
  items:any;

  constructor(public nav: NavController, public app: App,  private productService:ProductsService) {

  }


}
