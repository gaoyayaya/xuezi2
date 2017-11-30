import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service'
import {OrderConfirmPage} from '../order-confirm/order-confirm'
import {LoginPage} from '../login/login';
import {IndexPage} from '../index/index';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  uid="";
  data:Array<any>=[];
  sumPrice:number=0;
  isAllCheck:boolean=false;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public http:myHttpService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.checkUserLogin();
  }
  checkUserLogin(){
    this.http.sendRequest("http://localhost/project-ionic/data/user/session_data.php")
        .subscribe((result:any)=>{
            if(result.uid){
               this.uid=result.uid;
               this.loadData();
               }
            else
               this.navCtrl.push(LoginPage);
        })
  }
  loadData(){
    this.http.sendRequest("http://localhost/project-ionic/data/cart/list.php")
        .subscribe((result:any)=>{
            console.log(result.data)
            this.data=result.data;
             for(var p of this.data){
               p['isCheck']=false;
               this.changeChecke(p.iid,false);
            }
        })
  }
  deleteCart(index){
    let iid=this.data[index].iid;
    console.log(iid);
    this.http.sendRequest("http://localhost/project-ionic/data/cart/del.php?iid="+iid)
        .subscribe((result:any)=>{
            if(result.code==200){
               this.http.showToast("删除成功")
               this.data.splice(index,(index+1));
            }else{
               this.http.showToast("删除失败")
            }
        })
  }
  loadToIndex(){
    this.navCtrl.push(IndexPage);
  }
 
  modifyCount(index,isAdd:boolean){
     if(isAdd){
        this.data[index].count++;
        if(this.data[index].isCheck)
           this.sumPrice+=parseFloat(this.data[index].price);
     }else{
        if(this.data[index].count==1){
           return;
        }
        else{
          this.data[index].count--;
          if(this.data[index].isCheck)
           this.sumPrice-=parseFloat(this.data[index].price);
        }
     }
  }
  jumpToOrderConfirm(){
    //去订单确认页面
    this.navCtrl.push(OrderConfirmPage);
  }
  //修改选中商品
    changeChecke(id:any,check:boolean){
       this.http.sendRequest("http://localhost/project-ionic/data/cart/update_checked.php"
       +"?iid="+id+"&checked="+check)
       .subscribe((data:any)=>{
          console.log(data);
       })
    }
  //每个选择框的点击
    changeCheck(index:any){
        this.data[index].isCheck=!this.data[index].isCheck;
        if(this.data[index].isCheck==true){
           this.sumPrice+=this.data[index].count*this.data[index].price;
        }
        else{
           this.sumPrice-=this.data[index].count*this.data[index].price;
        }
        this.changeChecke(this.data[index].iid,this.data[index].isCheck);
        for(var p of this.data){
           if(p.isCheck==false){
               this.isAllCheck=false;
               return;
           }
           this.isAllCheck=true;
        }
    }
    //全选按钮
    changeAllCheck(){
        this.isAllCheck=!this.isAllCheck;
        this.sumPrice=0;
        if(this.isAllCheck){
            for(var p of this.data){
                p.isCheck=true;
                this.sumPrice+=p.price*p.count;
                this.changeChecke(p.iid,p.isCheck);
            }
        }
        else{
            for(var p of this.data){
                p.isCheck=false;
                this.changeChecke(p.iid,p.isCheck);
            }
        }
    }
}
