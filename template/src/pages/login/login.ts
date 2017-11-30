import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname="";
  upwd="";
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public http:myHttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  userLogin(){
    this.http.sendRequest("http://localhost/project-ionic/data/user/login.php?uname="+this.uname+"&upwd="+this.upwd)
        .subscribe((result:any)=>{
            console.log(result)
            if(result.code==401){
              this.http.showToast('用户名未输入')
            }else if(result.code==402){
              this.http.showToast('密码未输入')
            }else if(result.code==201){
              this.http.showToast('用户名或密码输入错误')
              this.uname="";
              this.upwd="";
            }
            else if(result.code==200){
              this.http.showToast('登录成功')
              this.navCtrl.pop();
            }
        })
  }
}
