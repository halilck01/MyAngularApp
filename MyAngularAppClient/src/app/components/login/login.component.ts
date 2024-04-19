import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule,InputTextModule,InputGroupModule,InputGroupAddonModule,PasswordModule,FormsModule,DividerModule,ToastModule,CheckboxModule],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
request: LoginModel = new LoginModel();
constructor(private message: MessageService, private http: HttpClient,private router:Router){}

signIn(){
  if(this.request.userNameOrEmail.length < 3){
    this.message.add({severity:'warn',summary:'Validator Error',detail:'Please enter a valid username!!'});
    return;
  }
  if(this.request.password.length < 8){
    this.message.add({severity:'warn',summary:'Validator Error',detail:'Password cannot be less than 8 characters'});
    return;
  }

  this.http.post("https://localhost:7000/api/Auth/Login",this.request)
  .subscribe({
    next: res=>{
      localStorage.setItem("response",JSON.stringify(res));
      this.router.navigateByUrl("/");
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      this.message.add({severity: 'error', summary: "", detail: err.error.message});
    }
  });
}
}
