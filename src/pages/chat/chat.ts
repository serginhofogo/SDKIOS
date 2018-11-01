import { Component } from '@angular/core';
import { NavController,  PopoverController } from 'ionic-angular';
import { ChatPopover } from './chat-popover'


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  constructor(public nav: NavController, public popoverCtrl: PopoverController) {

  }
  presentPopover(ev) {

    let popover = this.popoverCtrl.create(ChatPopover, {

    });

    popover.present({
      ev: ev
    });
  }

}
