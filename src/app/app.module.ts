import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { AdsPage } from '../pages/ads/ads';
import { ChatsPage } from '../pages/chats/chats';
import { DiscoverPage } from '../pages/discover/discover';
import { FilterPage } from '../pages/filter/filter';
import { ProductPage } from '../pages/product/product';
import { ChatPage } from '../pages/chat/chat';
import { ChatPopover } from '../pages/chat/chat-popover';
import { ChatBgPage } from '../pages/chat-bg/chat-bg';
import { ChatBuyerPopover } from '../pages/chat-bg/chat-buyer-popover';
import { MyProductPage } from '../pages/my-product/my-product';
import { PublishAdPage } from '../pages/publish-ad/publish-ad';
import { CreateAdModalPage } from '../pages/create-ad-modal/create-ad-modal';
import { ProductList } from '../pages/productList/productList';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicImageViewerModule } from 'ionic-img-viewer';

import { Camera } from '@ionic-native/camera';

const pages = [ LoginPage, RegisterPage, ProfilePage, TabsPage, AdsPage,
  ChatsPage, DiscoverPage, FilterPage, ProductPage, ChatPage, ChatPopover,
  ChatBgPage, ChatBuyerPopover, MyProductPage, PublishAdPage, CreateAdModalPage, ProductList];

const nativeProviders = [ SplashScreen, StatusBar ];


@NgModule({
  declarations: [
    MyApp,
    pages
  ],
  imports: [
    BrowserModule,
    HttpModule,  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pages
  ],
  providers: [ nativeProviders, Camera]
})
export class AppModule {}
