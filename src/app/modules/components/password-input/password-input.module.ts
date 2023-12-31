import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from './password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomFormValidators } from '../custom-validator/form-validation';


@NgModule({
  declarations: [
    PasswordInputComponent
  ],
  imports: [
      FormsModule, ReactiveFormsModule,
      MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule,


    CommonModule
  ],
  exports: [
    PasswordInputComponent
  ],
  providers: [
      CustomFormValidators
  ]
})
export class PasswordInputModule { }
