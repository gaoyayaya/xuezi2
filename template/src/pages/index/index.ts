import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {myHttpService} from '../../app/utility/service/myhttp.service';
import {DetailPage} from '../detail/detail'
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  carouselItems="";
  newArrivalItems="";
  recommendedItems="";
  constructor(public navCtrl: NavController,
   public navParams: NavParams
   ,public myhttp:myHttpService
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.loadData();
  }
  loadData(){
    this.myhttp.sendRequest("http://localhost/project-ionic/data/product/index.php")
        .subscribe((result:any)=>{
           console.log(result);
           this.carouselItems=result['carouselItems'];
           this.newArrivalItems=result['newArrivalItems'];
           this.recommendedItems=result['recommendedItems'];
           console.log(this.recommendedItems);
       })
  }
  jumpToDetail(myIndex){
    console.log(myIndex)
    console.log(this.recommendedItems[myIndex]['pid'])
     this.navCtrl.push(DetailPage,{pid:this.recommendedItems[myIndex]['pid']});
  }
}

