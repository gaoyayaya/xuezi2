import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {ToastController,LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class myHttpService {
    constructor(private http: Http,
    private toastCtr:ToastController,
    private loadCtr:LoadingController) { }
    
    sendRequest(url:string){
        //a-http-get
        //显示一个loading
        let myLoad=this.loadCtr.create({
            content:'正在加载中...'
        });
        myLoad.present();
        return this.http.get(url,{withCredentials:true})
            .map((response: Response) =>{
                myLoad.dismiss();
               return response.json()
             });
    }
    showToast(msg:string){
        //TOAST方法
        this.toastCtr.create({
            message:msg,
            duration:500
        }).present();
    }
    
}