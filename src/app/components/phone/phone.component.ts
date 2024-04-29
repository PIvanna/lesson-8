import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {
  public phoneForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){
    this.initPhoneForm();
  };


  initPhoneForm(): void {
    this.phoneForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
    })
  }
}
