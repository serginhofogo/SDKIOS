import { Component } from '@angular/core';
import { ViewController, App } from 'ionic-angular';

import { PublishAdPage } from '../publish-ad/publish-ad';

@Component({
  selector: 'page-create-ad-modal',
  templateUrl: 'create-ad-modal.html'
})
export class CreateAdModalPage {

  constructor( public viewCtrl: ViewController, public app: App ) {


  }

  public addProduct() {
    this.app.getRootNav().push(PublishAdPage);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
