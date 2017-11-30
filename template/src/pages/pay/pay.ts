import { Component } from '@angular/core';
import {LoadingController,ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public viewCtrl:ViewController,public loadCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }

  showLoading(){
    let myLoad = this.loadCtrl.create({
      content:'支付中'
    })

    myLoad.present();
    setTimeout(
      ()=>{
        //关闭加载中窗口
        myLoad.dismiss();
        //关闭当前模态窗
        this.viewCtrl.dismiss();
        myLoad.setContent('支付完成');
      },
      2000);
  }

}
