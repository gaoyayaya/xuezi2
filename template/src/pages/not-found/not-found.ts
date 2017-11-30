import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IndexPage} from '../index/index';

/**
 * Generated class for the NotFoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  // not found 不应该出现在tab所对应的根页面中
  time:number = 5;
  myTimer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
    this.myTimer = setInterval(()=>{
      this.time--;
      if(this.time == 0){
        //结束定时器，返回上一页
        clearInterval(this.myTimer);
        this.myTimer = null;
        this.navCtrl.push(IndexPage);
      }
    },1000)
  }

  ionViewWillLeave(){
    //清理工作
    if(this.myTimer){
      clearInterval(this.myTimer);
      this.myTimer = null;
    }
  }

}
