import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<LoginComponent>) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.onSuccessfulLogin();
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private onSuccessfulLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn = true;
    this.dialogRef.close({ success: true });
  }

  private markAllFieldsAsTouched() {
    for (const control of Object.values(this.loginForm.controls)) {
      control.markAsTouched();
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
  }
}
