import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as L from 'leaflet';

@Component({
    selector: 'unitList',
    templateUrl: './unitList.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent implements AfterViewInit {
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'unitIcon',
        'unitTitle',
        'connectedStatus',
        'IMEI',
        'tags',
        'lastTimePoint',
        'option',
    ];
    constructor() {}
    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data

        // Store the table data
        this.recentTransactionsDataSource.data = [
            {
                id: '1b6fd296-bc6a-4d45-bf4f-e45519a58cf5',
                unitIcon: 'assets/assets/uniticon/2.0x/ic_unit1.png',
                unitTitle: 'unit 01',
                connectedStatus: 'Connected',
                IMEI: '123456789123456',
                tags: 'service',
                lastTimePoint: '15 m ago',
            },
            {
                id: '2dec6074-98bd-4623-9526-6480e4776569',
                unitIcon: 'assets/assets/uniticon/2.0x/ic_unit2.png',
                unitTitle: 'unit 02',
                connectedStatus: 'No Connected',
                IMEI: '123456789123456',
                tags: 'prototype',
                lastTimePoint: '15 m ago',
            },
            {
                id: '2dec6074-98bd-4623-9526-6480e4776569',
                unitIcon: 'assets/assets/uniticon/2.0x/ic_unit3.png',
                unitTitle: 'unit 03',
                connectedStatus: 'No Connected',
                IMEI: '123456789123456',
                tags: 'test',
                lastTimePoint: '15 m ago',
            },
        ];
    }
    ngAfterViewInit(): void {}

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
