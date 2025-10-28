import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login to Complaint Portal</h2>
        <p>Use your college email ID</p>
        
        <form class="login-form" (ngSubmit)="onLogin()" *ngIf="!isLoading; else loading">
          <div class="form-group">
            <label for="email">College Email</label>
            <input type="email" id="email" [(ngModel)]="email" name="email" 
                   placeholder="Enter your college email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" 
                   placeholder="Enter your password" required>
          </div>
          
          <button type="submit" class="login-btn" [disabled]="!email || !password">
            Login
          </button>
          
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <ng-template #loading>
          <div class="loading">Logging in...</div>
        </ng-template>
        
        <div class="register-link">
          <p>Don't have an account? <a routerLink="/register">Register here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-card h2 {
      text-align: center;
      color: #333;
      margin-bottom: 10px;
    }

    .login-card p {
      text-align: center;
      color: #666;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      color: #333;
      font-weight: bold;
    }

    .form-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .login-btn:hover:not(:disabled) {
      background: #5a6fd8;
    }

    .login-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .error-message {
      background: #f8d7da;
      color: #721c24;
      padding: 10px;
      border-radius: 5px;
      margin-top: 15px;
      text-align: center;
      border: 1px solid #f5c6cb;
    }

    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 16px;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
    }

    .register-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    this.isLoading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Login successful, navigating to dashboard');
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Login error:', error);
        this.error = error.error?.message || 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}