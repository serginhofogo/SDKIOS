import { Component } from '@angular/core';
import { ProductsService } from '../../app/services/services';
import { NavController, App } from 'ionic-angular';
import { MyProductPage } from '../my-product/my-product';
import { ProductPage } from '../product/product';
import { LoginPage } from '../login/login';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-myUser',
  templateUrl: 'myUser.html'
})
export class MyUser {
  items: any;
  userList:any;
  profile = "profiler";
  myBaseURL:String;
  logged="no";

  myUser: any = null;
  userImage:SafeResourceUrl;

  orders: any;
  email:String = "";

  constructor(public nav: NavController, 
              public app: App, 
              public productService : ProductsService,
              private sanitizer: DomSanitizer,private alertCtrl: AlertController) {
    this.getBaseURL();
    this.getEmail();

    var user = this.productService.getEmail();
    if(user!= null && user != ""){
      console.log("Fetch User");
      this.getUserData();
    }else{
      console.log("Go to Login");
      this.app.getRootNav().push(LoginPage);
    }

    this.getAllOrders();


  }

  login(){
    this.app.getRootNav().push(LoginPage);
  }


  getAllOrders(){
    this.productService.getAllOrders().subscribe(response =>{
      this.orders = response.orders;
    })
  }

  getUserData(){
    this.productService.getUser().subscribe(response =>{
      this.myUser = response;
      console.log(JSON.stringify(response));
      var temp = this.myBaseURL + this.myUser.userImage;
      console.log("sanitized:" +  temp);
      this.userImage = this.sanitizer.bypassSecurityTrustResourceUrl(temp);
    });
  }

  public goToLogin() {
    this.app.getRootNav().push(LoginPage);
  }

  ionViewWillEnter(){
 
  }

  getEmail(){
    console.log("email0: " + this.email);
    this.email = this.productService.getEmail();
    console.log("email1: " + this.email);
    if(this.email==null || this.email == ""){
      
      this.app.getRootNav().push(LoginPage);
    }else{
      
    }
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
        console.log("Getting product list");
        this.productService.getUserListProducts().subscribe(response => {
          this.items = response.products;
          for(var r=0 ; r<this.items.length; r++){
            this.items[r].liked = "1";
          }
          //console.log("Productos: " + JSON.stringify(this.items));
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

                //remove liked from screen
                console.log("Items en pantalla: " + this.items.length);
                for(var j=0;j<this.items.length;j++){
                  if(this.items[j]._id==likedItem._id){
                    console.log("Removiendo:" + this.items[j]._id);
                    this.items.splice(j,1);
                  }
                }
                console.log("Items en pantalla after: " + this.items.length);


              }else{
                this.userList.push(likedItem._id);
              }
              console.log("Nueva Lista: " + JSON.stringify(this.userList) + " " + this.userList.length );
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

    presentFAQ() {
      let alert = this.alertCtrl.create({
        title: 'Preguntas Frecuentes',
        subTitle: '1. Métodos de pago <br/> Easytools acepta pagos de tajetas de crédito y débito, también ofrece la posibilidad de diferir tus pagos con tu tarjeta preferida.',
        buttons: ['Aceptar']
      });
      alert.present();
    }

    presentTERM() {
      let alert = this.alertCtrl.create({
        title: 'Términos y Condiciones',
        subTitle: 'La descarga y uso de la App atribuye la condición de Usuario de la misma (en adelante, el “Usuario”) e implica la aceptación plena, sin reservas y en su totalidad de los presentes términos y condiciones de uso de la App (en adelante, las “Condiciones Generales”). Por ello, EASYTOOLS recomienda a los Usuarios leer detenidamente las presentes Condiciones Generales antes de utilizar la App. <br/>' +
        'Las presentes Condiciones Generales regulan junto con la Política de Privacidad el uso de la App por parte del Usuario y la relación entre este último y EASYTOOLS. Las Condiciones Generales han sido redactadas de conformidad con lo dispuesto en la normativa vigente aplicable en materia de Internet, comercio electrónico y protección de datos, entre otras.'+
        'El acceso y descarga de la App son totalmente gratuitos salvo en lo relativo al coste de la conexión a través de la red de telecomunicaciones suministrada por el proveedor de acceso contratado por el Usuario.',
        buttons: ['Aceptar']
      });
      alert.present();
    }

    presentCON() {
      let alert = this.alertCtrl.create({
        title: 'Contacto',
        subTitle: 'Puede Contactarnos a los Siguientes números o enviarnos un email a contact@easytools.com',
        buttons: ['Aceptar']
      });
      alert.present();
    }

    presentACE() {
      let alert = this.alertCtrl.create({
        title: 'Acerca de:',
        subTitle: 'EasyTools es una empresa Ecuatoriana, establecida legalmente el año 2018.',
        buttons: ['Aceptar']
      });
      alert.present();
    }

}
