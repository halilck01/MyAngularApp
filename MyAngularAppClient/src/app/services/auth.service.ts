import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenModel } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: TokenModel = new TokenModel();
  constructor(private router: Router) { }

  checkAuthentication(){
    const responseString = localStorage.getItem("response");
     if(responseString != null){
       const responseJson = JSON.parse(responseString);
       if(responseJson!= null)
       {
          const token = responseJson?.accessToken;
          if(token != null){
              const decode : any = jwtDecode(token);
              this.token.Name = decode?.Name;
              this.token.Username = decode?.Username;
              this.token.UserId = decode?.UserId;
              this.token.exp = decode?.exp;
              const now = new Date().getTime() / 1000;
              if(this.token.exp < now){
                this.router.navigateByUrl("/login");
                return false;
              }
                return true;
              }
              else{
                this.router.navigateByUrl("/login");
                return false;
              }
              }
              else
              {
                this.router.navigateByUrl("/login");
                return false;
              }
      }
      
      this.router.navigateByUrl("/login");
      return false;
  }
}
