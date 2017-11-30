import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
import {CartPage} from '../cart/cart';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  pid="";
  details="";
  picList="";
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public http:myHttpService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    //接收index传来的参数
    this.pid=this.navParams.data.pid;
    this.loadMsg(this.pid);
  }
  loadMsg(lid){
    this.http.sendRequest("http://localhost/project-ionic/data/product/details.php?lid="+lid)
        .subscribe((result:any)=>{
           console.log(result.details)
           console.log(result.details.picList)
           this.details=result.details;
           this.pid=result.details.lid;
           console.log(this.details);
           this.picList=result.details.picList;
           console.log(this.picList)
        })
  }
  jumpToCart(pid){
    //向cart.add发送请求
    this.http.sendRequest("http://localhost/project-ionic/data/cart/add.php?lid="+pid)
        .subscribe((result:any)=>{
           console.log("添加的lid是"+pid);
       //如果未登录，跳转到登录页code==200
           if(result.code==300){
             this.http.showToast('去登陆')
              this.navCtrl.push(LoginPage)
           }else if(result.code==200){
          //如果已登录，显示添加成功code==200
              this.http.showToast('添加成功')
           }else if(result.code==500){
          //code==500添加失败
              this.http.showToast('添加失败')
           }
        })
  }
  loadCart(){
      this.navCtrl.push(CartPage);
  }
}
