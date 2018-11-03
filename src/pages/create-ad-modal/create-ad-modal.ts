import { Component } from '@angular/core';
import { ViewController, App } from 'ionic-angular';

import { PublishAdPage } from '../publish-ad/publish-ad';
import { DiscoverPage } from '../discover/discover';

@Component({
  selector: 'page-create-ad-modal',
  templateUrl: 'create-ad-modal.html'
})
export class CreateAdModalPage {

  constructor( public viewCtrl: ViewController, public app: App ) {


  }

  public checkout() {
    this.app.getRootNav().push(PublishAdPage);
  }

  public continueShop() {
    this.app.getRootNav().push(DiscoverPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
