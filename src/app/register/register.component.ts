import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  registerForm: any;
  allFieldsCompleted: boolean = false;




  constructor(private userService: UserService) {}


  isFirmAccountSelected(): boolean {
    const firmAccountRadio = document.getElementById('firmAccount') as HTMLInputElement;
  
    // Check if the firm account radio button is checked
    if (firmAccountRadio && firmAccountRadio.checked) {
      return true;
    } else {
      return false;
    }
  }


  onSubmit(registerForm: NgForm): void {
    if (this.isFirmAccountSelected()) {
      registerForm.value.type = "firm";
    } else {
      registerForm.value.type = "normal";
    }
  
    if (registerForm.value.password !== registerForm.value.passwordconfirm) {
      // Display an error message or handle it as needed
      alert('Passwords do not match.');
      return;
    }
  
    // Remove the passwordconfirm field before sending the request
    const { passwordconfirm, ...formDataWithoutConfirmPassword } = registerForm.value;
  
    this.userService.addUser(formDataWithoutConfirmPassword).subscribe(
      (response: User) => {
        alert(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  
    registerForm.reset();
  }
  


}



