import { Component } from '@angular/core';
import {ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service'
import {PayPage} from '../pay/pay';

/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
})
export class OrderConfirmPage {
  dataList:Array<any>=[];
  msg:any="";
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http:myHttpService,
   public modal:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    this.http.sendRequest("http://localhost/project-ionic/data/cart/list_checked.php")
    .subscribe((data)=>{
        console.log("dddddd");
        console.log(data);
         this.dataList=data.data;
         this.loadAddr();
    })
  }
  loadAddr(){
    //请求获得用户的个人信息
    this.http.sendRequest("http://localhost/project-ionic/data/user/get_basic.php")
        .subscribe((result:any)=>{
          console.log(result);
          this.msg=result;
        })
  }
  toPay(){
    //模态框类型的支付页面()
    this.modal.create(PayPage).present();
  }
}
