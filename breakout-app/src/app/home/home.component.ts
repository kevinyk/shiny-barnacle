import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: object = {email: ""};
  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    console.log('getCurrent');
    this._apiService.getCurrentUser()
    .subscribe((responseData: any)=>{
      console.log('responseData', responseData);
      if(responseData.errors){
        this._router.navigate(['/']);
      }
      else{
        this.currentUser = responseData;
      }
    })
  }

}
