import {Http} from '@angular/http';
import {GenericService} from './generic.service';
import {Config} from '../config';
import {Injectable} from '@angular/core';
import {Credentials} from "../models/credentials";
import {StorageService} from "./storage.service";
import 'rxjs/Rx';


@Injectable()
export class AuthService extends GenericService {

  constructor(private http: Http, private stoarageService: StorageService) {
    super();
  }


  login(credentials: Credentials) {
    const url = Config.baseUrl + '/users/auth/signin';
    console.log("email" , JSON.stringify(credentials));
    return this.http.post(url, JSON.stringify({
      "username": credentials.username,
      "email": credentials.email,
      "password1": credentials.password1,
      "password2": credentials.password2,
      
    }), {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  register(credentials: Credentials) {
    const url = Config.baseUrl + 'registration/';
    console.log("email" , JSON.stringify(credentials));
    return this.http.post(url, JSON.stringify({
      "username": credentials.username,
      "email": credentials.email,
      "password1": credentials.password1,
      "password2": credentials.password2,

    }), {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  isLoggedIn() {
    return this.stoarageService.read("token") != null;
  }

}
