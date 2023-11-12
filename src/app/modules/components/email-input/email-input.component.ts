import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomFormValidators } from '../custom-validator/form-validation';



@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EmailInputComponent implements OnInit {

  @Input('formItem') form!: FormGroup;
  @Input('formName') formName: string = '';
  @Input('lable') lable: string = '';
  @Input('isrequired') isrequired: boolean = false;
  @Input('appearance') appearance: any = '';
    @Input('icon') icon: string = '';
    @Input('readonly') readonly = false;
    @Input('placeholder') placeholder: string = 'example@gmail.com';
//   @Input('img_icon') img_icon: string = '';
  formGroup: any;
  formNames: any;
  constructor(private customFormValidator: CustomFormValidators) {

  }

  ngOnInit(): void {
    this.formGroup = this.form;
    this.formNames = this.formName;
    const formItem = this.formGroup.get(this.formNames);
    formItem.setValidators([this.customFormValidator.checkEmail,Validators.email]);
    formItem.updateValueAndValidity();
  }
}
