import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';

@Injectable()
export class DialogflowService {

  private baseURL: string = "http://localhost:5005/conversations/default/parse";
  //private token: string = environment.token;

  constructor(private http: Http){}

  public getResponse(query: string){
    let data = {
      'q' : query
    }
    return this.http
      .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
      .map(res => {
        console.log(res.json())
        return res.json()
      })
  }

  public getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
