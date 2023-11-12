import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailInputComponent } from './email-input.component';
import { CustomFormValidators } from '../custom-validator/form-validation';



@NgModule({
    declarations: [EmailInputComponent],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,       
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,   
      MatFormFieldModule,
      
    ],
    exports: [
        EmailInputComponent
    ],
    providers: [
        CustomFormValidators
    ]
})
export class EmailInputModule { }
