import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {StorageService} from "./storage.service";

@Injectable()
export class GenericService {
  headers: Headers;

  constructor() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

  }

  handleResponse(response: any) {
    console.log('**** response *****');
    console.log('status ' + response.status);
    console.log('statusText ' + response.statusText);
    console.log('url ' + response.url);
    console.log('headers ' + JSON.stringify(response.headers));
    console.log('**** response *****');
  }


  handleErrors(error: Response) {
    console.log('**** Error *****');
    console.log('status ' + error.status);
    console.log('statusText ' + error.statusText);
    console.log('url ' + error.url);
    console.log('headers ' + JSON.stringify(error.headers));
    console.log(JSON.stringify(error.json()));
    console.log('**** error *****');
    return Observable.throw(error);
  }

}
