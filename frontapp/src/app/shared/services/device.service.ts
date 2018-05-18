import {StorageService} from "./storage.service";
import {GenericService} from "./generic.service";

import {EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { Config } from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class DeviceService extends GenericService {
  

  constructor(private http: Http, private storageService: StorageService) {
    super();
   
  }

  getalldevicesperweek() {
    // this.headers.set("Authorization", "Bearer " + this.storageService.read("token"));
     const url = Config.baseUrl + "device";
 
     return this.http.get(url, {
       headers: this.headers
     })
       .map(res => res.json())
       .catch(this.handleErrors);
   }



 
  
}
