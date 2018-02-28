import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {
  newUser: object = {email: "", name: "", password: "", passwordConfirmation: ""};
  user: object = { email: "", password: "" };
  errors: string[]=[];
  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
  }
  register(){
    console.log('register');
    this._apiService.registerUser(this.newUser)
    .subscribe((responseData: any)=>{
      console.log(responseData);
      if(responseData.errors){
        for (var key in responseData.errors) {
          console.log(key);
          console.log(responseData.errors[key].message);
          this.errors.push(responseData.errors[key].message);
        }
      }else{
        this.errors = ['You successfully registered!'];
        this.newUser = { email: "", name: "", password: "", passwordConfirmation: "" };
      }
    })
  }
  login(){
    // console.log(this.newUser);
    console.log('login');
    this._apiService.loginUser(this.user)
    .subscribe((responseData:any)=>{
      console.log('responseData', responseData);
      this.errors = [];
      if(responseData.errors){
        console.log('validation errors');
        for(var key in responseData.errors){
          console.log(key);
          console.log(responseData.errors[key].message);
          this.errors.push(responseData.errors[key].message);
        }
      }else{
        console.log('logged in');
        this._router.navigate(['/secrets']);
      }
    })
  }

}
