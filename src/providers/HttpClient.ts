/**
 * Created by taocong on 2017/2/25.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Jsonp, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import { HTTP } from 'ionic-native';
import { Platform } from 'ionic-angular';
/*
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()

export class HttpClient {

  constructor(public jsonp: Jsonp, public http: Http, public platform: Platform)
  {
  }

  getNews<T>(jsonDict:any):Observable<T>
  {
    if(!jsonDict || (typeof jsonDict != 'object') )
    {
      return Observable.throw("无效的请求参数: " + jsonDict );
    }

    let newJsonDict = jsonDict;

    let url = "";
    if(jsonDict["jsonFile"] && jsonDict["jsonFile"].length > 0)
    {
      url = jsonDict["jsonFile"];
      return this.getFromJsonFile(url);
    }

  }


  private getFromJsonFile(url)
  {
    return this.http.get(url).map(res=>{
      return res.json();
    }).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error("origin error: " + error);
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = error.toString();
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error("error: " + errMsg);
    return Observable.throw(errMsg);
  }
}
