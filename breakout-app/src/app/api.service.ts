import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }
  loginUser(userObj){
    console.log('loginUser');
    return this._http.post('/api/login', userObj);
  }
  getCurrentUser(){
    console.log('getCurrentUser');
    return this._http.get('/api/users/current');
  }
  registerUser(userObj){
    console.log('registerUser');
    return this._http.post('/api/users', userObj);
  }
}
