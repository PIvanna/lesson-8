import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  public passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){
    this.initPasswordForm();
  };


  initPasswordForm(): void {
    this.passwordForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    })
  }
}
 