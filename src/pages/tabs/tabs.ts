import { Component } from '@angular/core';
import { ModalController, NavController, App} from 'ionic-angular';

import { DiscoverPage } from '../discover/discover';
import { ChatsPage } from '../chats/chats';
import { AdsPage } from '../ads/ads';
import { ProfilePage } from '../profile/profile';
import { CreateAdModalPage } from '../create-ad-modal/create-ad-modal';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = DiscoverPage;
  tab2Root: any = ChatsPage;
  tab3Root: any = AdsPage;
  tab4Root: any = ProfilePage;

  constructor(public nav: NavController, public app: App, public modalCtrl: ModalController) {

  }

  publishAd() {
    let modal = this.modalCtrl.create(DiscoverPage);
    modal.present();
  }
}
