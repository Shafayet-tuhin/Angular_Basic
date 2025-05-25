import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private auth = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    const isUser = localStorage.getItem('currentUser');
    console.log(isUser);
    if (isUser) {
      this.auth.navigateByUrl('/dashboard');
    }
  }

  onSubmit(): void {
    const isUser = this.auth
      .login(this.email, this.password)
      .subscribe((isUser) => {
        if (isUser) {
          this.errorMessage = '';

          this.auth.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.email = '';
        this.password = '';
      });
  }
}
