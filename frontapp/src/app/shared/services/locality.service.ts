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
export class LocalityService extends GenericService {
  

  constructor(private http: Http, private storageService: StorageService) {
    super();
   
  }

  getAlllocality_df(dep,date_debut, date_fin) {
    // this.headers.set("Authorization", "Bearer " + this.storageService.read("token"));
     const url = Config.baseUrl + "localites/" + dep + "/"+ date_debut + "/" +  date_fin;
 
     return this.http.get(url, {
       headers: this.headers
     })
       .map(res => res.json())
       .catch(this.handleErrors);
   }

   getlocalityfordep_df(date_debut, date_fin,dep) {
    // this.headers.set("Authorization", "Bearer " + this.storageService.read("token"));
     const url = Config.baseUrl + "localitesfordep/"  + date_debut + "/" +  date_fin + "/" + dep;
 
     return this.http.get(url, {
       headers: this.headers
     })
       .map(res => res.json())
       .catch(this.handleErrors);
   }

   getPercentagePerDepartment_df(date_debut, date_fin) {
    // this.headers.set("Authorization", "Bearer " + this.storageService.read("token"));
     const url = Config.baseUrl + "countylocality/" + date_debut + "/" +  date_fin;
 
     return this.http.get(url, {
       headers: this.headers
     })
       .map(res => res.json())
       .catch(this.handleErrors);
   }
 
  
}
