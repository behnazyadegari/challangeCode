import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomFormValidators } from '../custom-validator/form-validation';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {

    @Input('hide') hide: boolean = true;
    @Input('formItem') form!: FormGroup;
    @Input('formName') formName: string = '';
    @Input('appearance') appearance: any = '';
    @Input('lable') lable: string = '';
    @Input('icon') icon: string = '';
    @Input('placeholder') placeholder: string = 'At least  character';

    formGroup: any;
    formNames: any;
    constructor(
    ) {}

    ngOnInit(): void {
        this.formGroup = this.form;
        this.formNames = this.formName;
        const formItem = this.formGroup.get(this.formNames);
        formItem.setValidators([
            CustomFormValidators.strong
            ]);
    }

}
