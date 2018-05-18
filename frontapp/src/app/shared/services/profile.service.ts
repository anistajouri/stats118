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
export class ProfileService extends GenericService {
  

  constructor(private http: Http, private storageService: StorageService) {
    super();
   
  }

  getallprofilesperweek() {
    // this.headers.set("Authorization", "Bearer " + this.storageService.read("token"));
     const url = Config.baseUrl + "profile";
 
     return this.http.get(url, {
       headers: this.headers
     })
       .map(res => res.json())
       .catch(this.handleErrors);
   }



 
  
}
