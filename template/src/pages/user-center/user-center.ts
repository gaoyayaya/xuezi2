import { Component } from '@angular/core';
import { IonicPage,ToastController, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service';
import {IndexPage} from '../index/index';


/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  name:string="";
  constructor(public toastCtrl:ToastController,
  public myHttp:myHttpService,
  public navCtrl: NavController,
   public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
    this.myHttp.sendRequest('http://localhost/project-ionic/data/user/session_data.php')
    .subscribe((data)=>{
        console.log(data.uname);
        this.name=data.uname;
    })
}

  logout(){
    //完成与服务器端的通信，退出登录
    this.myHttp
    .sendRequest("http://localhost/project-ionic/data/user/logout.php")
    .subscribe((result)=>{
      console.log(result);
      if(result.code == 200){
        //通过toast提示 退出登录成功
        this.toastCtrl.create({
          message:'退出登录成功',
          duration:500
        }).present();
        setTimeout(()=>{
          this.navCtrl.push(IndexPage);
        },2000)
      }
    })

  }

}
