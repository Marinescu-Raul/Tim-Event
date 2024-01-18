import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(loginForm: NgForm): void {
  
  
    this.userService.getUserByEmail(loginForm.value.email).subscribe(
      (user: User) => {
        if (user && user.password === loginForm.value.password) {
          
          this.router.navigate(['/mainpage'], { state: { user } });
        } else {
          
          console.error('Invalid credentials');
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  
     
  }


}
  

