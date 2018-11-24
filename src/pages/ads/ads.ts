import { Component } from '@angular/core';
import { ProductsService } from '../../app/services/services';
import { NavController, App } from 'ionic-angular';
import { MyProductPage } from '../my-product/my-product';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {
  items: any;
  userList:any;
  chat = "buying";
  myBaseURL:String;

  constructor(public nav: NavController, public app: App, public productService : ProductsService) {
    this.getBaseURL();
    this.liked(null);
  }

  getBaseURL(){
    this.myBaseURL = this.productService.getBaseURL();
  }

  public showProduct(item) {
    console.log('Clicked');
    console.log(item);
    this.app.getRootNav().push(ProductPage,{item:item});
  }

  ngOnInit(){
    console.log("inicio buscando Productos");
    this.liked(null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductPage');
  }


  liked(likedItem){
      if(likedItem != null){
        console.log("Liked is not null");
        try{
          if(likedItem.liked == null){
            likedItem.liked = "1";
          }else{
            if(likedItem.liked == "1"){
              likedItem.liked = null;
            }
          }
        }catch{
          likedItem.liked = "1";
        }
      }

      try{
        console.log("get product list");
        this.productService.getUserListProducts().subscribe(response => {
          this.items = response.products;
          for(var r=0 ; r<this.items.length; r++){
            this.items[r].liked = "1";
          }
          console.log("Productos: " + JSON.stringify(this.items));
          this.productService.saveUserListId(response._id);
          if(likedItem != null){
            this.productService.getUserList().subscribe(response => {
              console.log("LISTA DE ITEMS:" + JSON.stringify(response.list));
              this.userList = response.list.products;
              console.log("Número de Items: " + JSON.stringify(this.userList) + " " + this.userList.length );
              var exist = 0;
              for(var i=0;i<this.userList.length;i++){
                if(this.userList[i]==likedItem._id){
                  exist = 1;
                }
              }
              var tempIndex = null;
              if(exist==1){
                for(var i=0;i<this.userList.length;i++){
                  if(this.userList[i]==likedItem._id){
                    tempIndex = i;
                  }
                }
                this.userList.splice(tempIndex, 1);
                //removel liked
                for(var j=0;j<this.items.length;j++){
                  if(this.items._id==likedItem._id){
                    this.items[j].splice(j,1);
                  }
                }
              }else{
                this.userList.push(likedItem._id);
              }
              console.log("Nueva Lista: " + JSON.stringify(this.userList));
              this.productService.updateList(this.userList).subscribe(response =>{
                console.log(JSON.stringify(response));
              })
            });
          }else{

          }
        }, error => {
          console.log("ERROR" + error);
          this.productService.createUserList().subscribe(response => {
            console.log("Created List:" + JSON.stringify(response));
          });
        });
      }catch{
        console.log("Error en lista");
      }
    }

}
