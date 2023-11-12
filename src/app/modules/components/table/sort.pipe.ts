import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'order_by'
})
export class SortPipe implements PipeTransform {

    transform(value: any, propName: string, sortType:string) {
        return value.sort((a, b) => {
            let x1;
            let x2;
            if (typeof a[propName] === 'object')
                x1 = a[propName].title;
            else
                x1 = a[propName];

            if (typeof b[propName] === 'object')
                x2 = b[propName].title;
            else
                x2 = b[propName];


            if (x1 < x2 && sortType!='desc') {
                return -1
            }
            else if (x1 < x2 && sortType == 'desc') {
                return 1
            }
            else if (x1 === x2) {
                return 0;
            }
            else if (x1 > x2 && sortType != 'desc') {
                return 1;
            }
            else if (x1 > x2 && sortType == 'desc') {
                return -1;
            }
        });
    }
}