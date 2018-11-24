import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsService } from './services/services';
import { LoginPage } from '../pages/login/login';
import { DiscoverPage } from '../pages/discover/discover';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
  providers: [ProductsService]
})
export class MyApp {
  rootPage = TabsPage

  constructor(private platform: Platform, private statusBar: StatusBar,
    private splashScreen: SplashScreen) {
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
