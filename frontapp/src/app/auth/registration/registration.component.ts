import { Component, OnInit } from '@angular/core';
import {Credentials} from "../../shared/models/credentials";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';
import { StorageService } from "../../shared/services/storage.service";
declare let swal: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  credentials: Credentials = new Credentials();
  isLoading: boolean;
  alert: boolean =false;

  constructor(private authService: AuthService,
    private stoarageService: StorageService,
    private router: Router) { }

  ngOnInit() {
  }

  

}

