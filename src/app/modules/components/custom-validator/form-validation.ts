import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, FormControl } from "@angular/forms";

@Injectable()
export class CustomFormValidators {
    /**
     * بررسی صحت کد ملی
     * use invalid
     * @param control  string
     */
    checkNationalCode(control: any) {
        if (!control.value)
            return null;
        var number = control.value;
        var returnModel = ""
        let symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];
        var nationalCode = returnModel;
        var isNumber = /^\d{10}$/.test(nationalCode);

        var isValid: boolean = false;

        if (isNumber && nationalCode.length == 10) {
            var allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
            if (allDigitEqual.indexOf(nationalCode) > -1)
                isValid = false;
            else {

                var num0 = parseInt(nationalCode.charAt(0)) * 10;
                var num2 = parseInt(nationalCode.charAt(1)) * 9;
                var num3 = parseInt(nationalCode.charAt(2)) * 8;
                var num4 = parseInt(nationalCode.charAt(3)) * 7;
                var num5 = parseInt(nationalCode.charAt(4)) * 6;
                var num6 = parseInt(nationalCode.charAt(5)) * 5;
                var num7 = parseInt(nationalCode.charAt(6)) * 4;
                var num8 = parseInt(nationalCode.charAt(7)) * 3;
                var num9 = parseInt(nationalCode.charAt(8)) * 2;
                var a = parseInt(nationalCode.charAt(9));

                var b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
                var c = b % 11;

                if (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)))
                    isValid = true;
                else
                    isValid = false;
            }
        } else
            isValid = false;



        if (isValid == true)
            return null;
        else
            return { 'invalid': true };
    }

    /**
       * بررسی قوی بودن رمز عبور
       * use invalid
       * @param control  string
       */
    public static strong(control: FormControl) {
        if (control.value == null) {
            return null;
        }
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);

        let isLenght = false;
        if (control.value.length >= 8) {
            isLenght = true;
        }
        console.log('Num:', hasNumber, 'Upp:', hasUpper, 'Low:', hasLower, 'isLenght:', isLenght);
        const valid = hasNumber && hasUpper && hasLower && isLenght;
        if (!valid) {
            // return what´s not valid
            return { 'hasNumber': hasNumber, 'hasUpper': hasUpper, 'hasLower': hasLower, 'minLen': isLenght };
        }
        return null;
    }



    ///////////////////////
    /**
   * بررسی صحت کد ملی
   * use invalid
   * @param control  string
   */
    checkNationalEconomi(control: any) {
        if (!control.value)
            return null;
        var number = control.value;
        var returnModel = "", symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];
        var nationalCode = returnModel;
        var isNumber = /^\d{10}$/.test(nationalCode);

        var isValid: boolean = false;

        if (isNumber && nationalCode.length == 10) {
            var allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
            if (allDigitEqual.indexOf(nationalCode) > -1)
                isValid = false;
            else {

                var num0 = parseInt(nationalCode.charAt(0)) * 10;
                var num2 = parseInt(nationalCode.charAt(1)) * 9;
                var num3 = parseInt(nationalCode.charAt(2)) * 8;
                var num4 = parseInt(nationalCode.charAt(3)) * 7;
                var num5 = parseInt(nationalCode.charAt(4)) * 6;
                var num6 = parseInt(nationalCode.charAt(5)) * 5;
                var num7 = parseInt(nationalCode.charAt(6)) * 4;
                var num8 = parseInt(nationalCode.charAt(7)) * 3;
                var num9 = parseInt(nationalCode.charAt(8)) * 2;
                var a = parseInt(nationalCode.charAt(9));

                var b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
                var c = b % 11;

                if (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)))
                    isValid = true;
                else
                    isValid = false;
            }
        } else
            isValid = false;



        if (isValid == true)
            return null;
        else
            return { 'invalid': true };


        var controlDigit = nationalCode.substring(control.value.length() - 1, control.value.length());
        var deci = nationalCode.substring(control.value.length() - 2, control.value.length() - 1);
        var decimal = parseInt(deci) + 2;
        var multiplier: number[] = [29, 27, 23, 19, 17, 29, 23, 19, 17]
        var sum = 0;
        var i = 0;
        for (var i = 0; i < number.length; i++) {
            var temp = (parseInt("" + i) + decimal) * multiplier[i];
            i++;
            sum += temp;
        }

        var modBy11 = sum % 11;
        if (modBy11 == 10) {
            modBy11 = 0;
        }

        if (modBy11 == parseInt(controlDigit))
            return true;

        return false;
    }




    /**
    * بررسی صحت کد پستی
    * use invalid
    * @param control  string
    */
    checkPostalCode(control: any) {
        if (!control.value)
            return null;
        var number = control.value;
        var returnModel = "", symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];
        var postalCode = returnModel;
        var isNumber = /^\d{10}$/.test(postalCode);

        var isValid: boolean;

        if (isNumber && postalCode.length == 10)
            isValid = true;

        else
            isValid = false;



        if (isValid == true)
            return null;
        else
            return { 'invalid': true };
    }



    /**
     *  بررسی صحت شماره موبایل
       * use invalid
     * @param control
     */
    checkMobileNumber(control: AbstractControl) {
        if (!control.value)
            return null;
        let number = control.value;
        let returnModel = "", symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];
        const mobileNumber = returnModel;
        const isNumber = /^\d{11}$/.test(mobileNumber);
        if (!isNumber)
            return { invalid: true };

        // validation logic pre number
        let validNumber = ['901', '902', '903', '904', '905', '930', '933', '935', '936', '937', '938', '939',  //irancel
            '910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '990', '991', '992', '993' ,    //MCI
            '920', '921', '922',        //Rightel
            '931',  //Espadan (MTCE)
            '921',  //Taliya
            '934',  //Kish-TCI
            '998'  //Shatel-mobile
        ];
        let valid = false;
        // check validation mobile number
        for (var i = 0; i < validNumber.length; i++) {
            if (mobileNumber.toString().substring(1, 4) == validNumber[i])
                valid = true;
        }


        if (valid)
            return null;
        else
            return { invalid: true };
    }


    /**
     * بررسی حروف فارسی
     * use pattern
     * @param control
     */
    checkPersianCharacters(control: AbstractControl) {
        if (!control.value)
            return null;
        var word = control.value;
        var isValid = /^([\u0600-\u06FF]+\s*)+$/.test(word);
        if (isValid)
            return null
        else
            return { pattern: true };
    }


    /**
   * بررسی حروف انگلیسی
   * use pattern
   * @param control
   */
    checkEnglishCharacters(control: AbstractControl) {
        if (!control.value)
            return null;
        var word = control.value;
        var isValid = /^([a-zA-Z]+\s*)+$/.test(word);
        if (isValid)
            return null
        else
            return { pattern: true };
    }

    /**
  * بررسی حروف انگلیسی و اعداد
  * use pattern
  * @param control
  */
    checkEnglishAndNumberCharacters(control: AbstractControl) {
        if (!control.value)
            return null;
        var word = control.value;
        var isValid = /^[a-zA-Z]+[a-zA-Z0-9-_]*$/.test(word);
        if (isValid)
            return null
        else
            return { pattern: true };
    }

    /**
     * بررسی تلفن ثابت به همراه کد
     * 0xxxxxxxxxx
     * use pattern
     * @param control
     */
    checkPhoneNumber(control: AbstractControl) {
        if (!control.value)
            return null;
        var number = control.value;
        var returnModel = "", symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];

        var word = returnModel;
        var isValid = /^((?:0)[0-9]{10})$/.test(word);
        if (isValid)
            return null
        else
            return { pattern: true };
    }


    /**
     * بررسی صحیت ایمیل
     * a@b.c
     * use email
     * @param control
     */
    checkEmail(control: AbstractControl) {
        if (!control.value)
            return null;
        var word = control.value;
        var isValid = /^[\w-.]+@([\w-]+\.)+[\w-]+$/.test(word);    // /^.+@.+\..+$/.test(word);
        if (isValid)
            return null
        else
            return { email: true };
    }


    /**
     * بررسی بازه سنی (شروع و پایان)
     * ageRangeFromوageRangeTo
     *برای حالتی که نوع ورودی عددی باشد
     * type="number"
     *
     * use range
     * */
    checkAgeRangeValidator: any | null = (fg: FormGroup) => {
        const start = fg.get('ageRangeFrom')!.value;
        const end = fg.get('ageRangeTo')!.value;
        if (!start && !end)
            return null;
        return start !== null && end !== null && start <= end //this start<end is not correct for text type! because '3'>'21'!!!
            ? null
            : { ageRange: true };

    }


    /**
     * بررسی بازه سنی (شروع و پایان)
     * ageRangeFromوageRangeTo
     *برای حالاتی که نوع ورودی متنی است
     * type="text"
     * use parent fg...
     * */
    checkAgeRange(control: AbstractControl) {
        if (!control.parent)
            return null;
        const start = control.parent.get('ageRangeFrom')!.value;
        const end = control.parent.get('ageRangeTo')!.value;
        if (!start || !end)
            return null;
        return start !== null && end !== null && !isNaN(+start) && !isNaN(+end) && +start <= +end
            ? null
            : { ageRange: true };
    }

    /**
   * بررسی کاراکترهای عددی
   * use pattern
   * @param control
   */
    checkNumberCharacters(control: AbstractControl) {
        if (!control.value)
            return null;
        let number = control.value;
        let returnModel = "", symbolMap: any = {
            '۱': '1',
            '۲': '2',
            '۳': '3',
            '۴': '4',
            '۵': '5',
            '۶': '6',
            '۷': '7',
            '۸': '8',
            '۹': '9',
            '۰': '0'
        };
        number = number.toString();
        for (var i = 0; i < number.length; i++)
            if (symbolMap[number[i]])
                returnModel += symbolMap[number[i]];
            else
                returnModel += number[i];

        const word = returnModel;

        const isValid = /^(0|[0-9]\d*)?$/.test(word);
        if (isValid)
            return null
        else
            return { pattern: true };
    }
    validateIranianSheba(control: AbstractControl) {
        if (!control.value)
            return null;
        const str = control.value;
        const pattern = /IR[0-9]{24}/;

        if (str.length !== 26) {
            return { invalid: true };
        }

        if (!pattern.test(str)) {
            return { invalid: true };
        }

        let newStr = str.substr(4);
        const d1 = str.charCodeAt(0) - 65 + 10;
        const d2 = str.charCodeAt(1) - 65 + 10;
        newStr += d1.toString() + d2.toString() + str.substr(2, 2);
        let valid = false;
        const remainder = this.checkSheba(newStr);
        if (remainder !== 1) {
            valid = false;
        }

        valid = true;


        if (valid)
            return null;
        else
            return { invalid: true };
    };

    checkSheba(iban: any) {
        var remainder = iban, block;

        while (remainder.length > 2) {
            block = remainder.slice(0, 9);
            remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
        }

        return parseInt(remainder, 10) % 97;
    }


    checkCardNumber(control: AbstractControl) {
        if (!control.value)
            return null;
        const str = control.value;
        let L = str.length;
        if (L < 16 || parseInt(str.substr(1, 10), 10) == 0 || parseInt(str.substr(10, 6), 10) == 0) return { invalid: true };
        /*   var c = parseInt(str.substr(15, 1), 10);*/
        let s = 0;
        let k, d;
        for (var i = 0; i < 16; i++) {
            k = (i % 2 == 0) ? 2 : 1;
            d = parseInt(str.substr(i, 1), 10) * k;
            s += (d > 9) ? d - 9 : d;
        }
        if ((s % 10) == 0)
            return null;
        else
            return { invalid: true };
    }



    /**
     * Check for empty (optional fields) values
     *
     * @param value
     */
    static isEmptyInputValue(value: any): boolean {
        return value == null || value.length === 0;
    }

    /**
     * Must match validator
     *
     * @param controlPath A dot-delimited string values that define the path to the control.
     * @param matchingControlPath A dot-delimited string values that define the path to the matching control.
     */
    static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {

            // Get the control and matching control
            const control = formGroup.get(controlPath);
            const matchingControl = formGroup.get(matchingControlPath);

            // Return if control or matching control doesn't exist
            if (!control || !matchingControl) {
                return null;
            }

            // Delete the mustMatch error to reset the error on the matching control
            if (matchingControl.hasError('mustMatch')) {
                delete matchingControl.errors!.mustMatch;
                matchingControl.updateValueAndValidity();
            }

            // Don't validate empty values on the matching control
            // Don't validate if values are matching
            if (this.isEmptyInputValue(matchingControl.value) || control.value === matchingControl.value) {
                return null;
            }

            // Prepare the validation errors
            const errors = { mustMatch: true };

            // Set the validation error on the matching control
            matchingControl.setErrors(errors);

            // Return the errors
            return errors;
        };
    }




}
