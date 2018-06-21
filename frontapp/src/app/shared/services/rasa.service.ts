import {StorageService} from "./storage.service";
import {GenericService} from "./generic.service";

import {EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';



@Injectable()
export class RasaService extends GenericService {
  
  private baseURL: string = "http://localhost:5005/conversations/default/parse";
  //private token: string = environment.token;

  constructor(private http: Http){
    super();
  }

  public getResponse(query: string){
    let data = {
      'q' : query
    }
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .map(res => {
        console.log(res.json())
        //var v = "23341 recherches de proximites"
        return res;
      })
      
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
