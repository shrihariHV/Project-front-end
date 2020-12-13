import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service'

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router, private notifyService : NotificationService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.login({email, password}).subscribe(
        resData => {
          console.log(resData);
          this.router.navigate(['/home']);
        },
        errorMessage => {
          this.error = errorMessage;
        }
      );
    } else {
      this.authService.signUp({email, password}).subscribe(
        resData => {
          this.router.navigate(['/auth']);
          this.showToasterSuccess();
        },
        errorMessage => {
          this.error = errorMessage;
        }
      );
    }
    form.reset();
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Sign up successful", "Please login to continue")
  }

  showToasterError(){
        this.notifyService.showError("Something is wrong", "Please try again")
  }
}
