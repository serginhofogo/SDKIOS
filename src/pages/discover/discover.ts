import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { FilterPage } from '../filter/filter';
import { ProductPage } from '../product/product';
import { ProductsService } from '../../app/services/services';
import { ProductList } from '../productList/productList';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html'
})
export class DiscoverPage {


  home:String = 'offers';


  items: any;
  categoriesList: any; 
  category: any; 
  limit: any;
  userList:any;

  myBaseURL:String;

  public toggled: boolean;
  public showSearchResults: boolean;

  constructor(public nav: NavController, 
    public app: App, 
    private productService:ProductsService) {

    this.toggled = false;
    this.showSearchResults = true;
    this.getBaseURL();
    this.getCategoriesList();
    this.getDefaults();
    this.liked(null);

  }

  toggleSearch() {
    this.toggled = this.toggled ? false : true;
    this.showSearchResults = this.toggled ? false : true;
  }

  showResults() {
    this.showSearchResults =  true;
  }
  clearSearch() {
    this.showSearchResults =  false;
  }

  public openFilter() {
    this.app.getRootNav().push(FilterPage);
  }

  public showProduct(item) {
    console.log('Clicked');
    console.log(item); 
    this.app.getRootNav().push(ProductPage,{item:item});
  }

  ngOnInit(){
    console.log("inicio buscando Productos");
    this.getProducts(this.category);
  }

  getProducts(category){
    this.productService.getProducts(category).subscribe(response => {
      this.items = response.products;
    });
  }

  getCategoriesList(){
    this.productService.getCategoriesList().subscribe(response => {
      this.categoriesList = response.categories;
      //console.log("CATEGORIAS: " + JSON.stringify(this.categoriesList ));
    });
  }

  getDefaults(){
    this.category = '0001';
  }

  changeCategory(){
    this.getProducts(this.category);
  }

  getBaseURL(){
    this.myBaseURL = this.productService.getBaseURL();
  }

  liked(likedItem){

    var email = this.productService.getEmail();
    if((email==null || email == "") && likedItem != null){
      this.app.getRootNav().push(LoginPage);
    }else{
      if(likedItem != null){
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
        this.productService.getUserListProducts().subscribe(response => {
          this.productService.saveUserListId(response._id);
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
            }else{
              this.userList.push(likedItem._id);
            }
            console.log("Nueva Lista: " + JSON.stringify(this.userList) + " " + this.userList.length );
            this.productService.updateList(this.userList).subscribe(response =>{
              console.log(JSON.stringify(response));
            })
          });
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



    // CATEGORIAS
    showCategory(myCat){

      console.log(JSON.stringify(myCat));
      this.app.getRootNav().push(ProductList,{mycat:myCat});
    }

  }
