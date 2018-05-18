import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Credentials } from 'app/shared/models/credentials';
import { StorageService } from 'app/shared/services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials = new Credentials();
  isLoading: boolean;
  alert: boolean =false;
 
  constructor(private authService: AuthService,
    private stoarageService: StorageService,
    private router: Router) { }

  ngOnInit() {
  }


  loginSubmit() {
    
    console.log(JSON.stringify(this.credentials));
    this.isLoading = true;
    this.authService.register(this.credentials)
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.router.navigate(["/auth/login"], {queryParams: {reload: true}});

        },
        (error) => {
          this.isLoading = false;
          this.alert=true;
        }
      )
  }
}
