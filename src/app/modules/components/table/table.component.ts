import { Component, Input, OnInit, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Output, EventEmitter } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;

    @Input('dataTableForm') dataTableForm: any = {};
    @Input('dataSourceTable') dataSourceTable: any = {};
    @Input('get') get: any = () => { this.loading = false; };
    @Input('getData') getData: any = () => { this.loading = false; };
    @Input('expandMethod') expandMethod: any = () => { };
    @Input('hasFilter') hasFilter: boolean = true;
    @Input('hasExport') hasExport: boolean = true;
    @Input('exportToExcle') exportToExcle: any = 'notMethod';


    searchText: string = '';
    repSearch: string = '';
    notCode: boolean = false;
    isLoadingChartInfo: boolean = false;
    loading: boolean = false;
    test: string;
    public items: Array<any>
    public editItem: any = null;
    public editorFocused: boolean = false;
    public hoverItem: any = null;
    displayedColumns: string[] = [];
    displayedColumnsSmall: string[] = [];
    expandData: string[] = [];
    expandDataSmall: string[] = [];
    dataSource = new MatTableDataSource<any>();
    dataColumns = {};
    columnsType = {};
    columnsIcon = {};
    isrequired = {};
    data:any = [];
    listCount: number = 0;
    pageSize = [];
    expandable: boolean;
    userIds: string[] = [];
    notExistCode: boolean = false;
    changeSelection: any = () => {

    }

    selectionTable = new SelectionModel<any>(true, []);
    @ViewChild(MatPaginator, { static: true }) tablePaginator: MatPaginator;
    @ViewChild('empTbSort') empTbSort = new MatSort();
    @Output() newItemEvent = new EventEmitter<any>();
    @Output() saveItem = new EventEmitter<any>();
    @Output() selectionItem = new EventEmitter<any>();
    loadExcel: boolean;
    sortedData:any;
    peropertySort: any;
    sortType: any;
    constructor(

        @Inject(DOCUMENT) private document: any,

    ) {
        //this.onPageChange();
        this._unsubscribeAll = new Subject();
        this.sortedData = this.data.slice();
    }
    expandedElement: any | null;

    ngOnInit() {
        if (this.dataTableForm.displayedColumns) {
            this.displayedColumns = this.dataTableForm.displayedColumns;
            if (this.dataTableForm.expandData)
                if (!this.displayedColumns?.includes("ex"))
                    this.displayedColumns.push('ex')
            this.displayedColumnsSmall = this.dataTableForm.displayedColumnsSmall;
            if (this.displayedColumnsSmall)
                if (!this.displayedColumnsSmall?.includes("ex"))
                    this.displayedColumnsSmall.push('ex')
            this.expandData = this.dataTableForm.expandData;
            this.expandDataSmall = this.dataTableForm.expandDataSmall;
            this.dataColumns = this.dataTableForm;
            this.dataColumns['ex'] = {
                columnsName: '',
                columnsType: 'ex',
                columnsIcon: '',
                columnsIsrequired: false,
                enable: false,

            }
            this.pageSize = this.dataTableForm.pageSize;
            this.expandable = this.dataTableForm.expandable;
        }
        else {
            this.dataTableForm.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
                this.displayedColumns = data.displayedColumns;
                if (data.expandData)
                    if (!this.displayedColumns?.includes("ex"))
                        this.displayedColumns.push('ex')

                this.displayedColumnsSmall = data.displayedColumnsSmall;
                if (this.displayedColumnsSmall)
                    if (!this.displayedColumnsSmall?.includes("ex"))
                        this.displayedColumnsSmall.push('ex')
                this.expandData = data.expandData;
                this.expandDataSmall = data.expandDataSmall;
                this.dataColumns = data;
                this.dataColumns['ex'] = {
                    columnsName: '',
                    columnsType: 'ex',
                    columnsIcon: '',
                    columnsIsrequired: false,
                    enable: false,

                }
                this.pageSize = data.pageSize;
                this.expandable = data.expandable;

            });
            this.onPageChange();
        }

        this.dataSourceTable.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
            this.data = data.data;
            this.listCount = data.listCount;

            if (data.items) {
                this.data = data.items;
                this.listCount = data.totalCount;
            }
            if (this.data?.length > 0) {
                let selectedRows = [];
                this.data.forEach(row => { if (row.selected) selectedRows.push(row) });
                this.selectionTable = new SelectionModel<any>(true, selectedRows);
            }

            this.loading = false;

            setTimeout(() => {
                if (this.document.getElementsByClassName("peykar-filter-grid-page") && this.document.getElementsByClassName("grid-container") && this.document.getElementsByClassName("grid-container")[0] && this.document.getElementsByClassName("peykar-filter-grid-page")[0]) {
                    this.document.getElementsByClassName("peykar-filter-grid-page")[0].style.minHeight =
                        (this.document.getElementsByClassName("grid-container")[0].offsetHeight + 180) + 'px';
                }
            }, 10);

        });

        this.getdata();
    }
    sortData(ev,data: any) {
        this.peropertySort = ev.active;
        this.sortType = ev.direction;
        if (data.data) {
            let temp = [];
            data.data.forEach(i => { temp.push(i) });
            this.dataSourceTable.next({ data: temp, listCount: this.listCount });
        }
        else {
            let temp = [];
            data.forEach(i => { temp.push(i) });
            this.dataSourceTable.next({ data: temp, listCount: this.listCount });
        }


    }



    //get  Courses List From Server
    getdata() {


        merge(this.tablePaginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {

                    //scroll to top .... to Do only scroll to top when used in filter-grid pages... not in registeration forms!
                    if (this.document.getElementsByClassName('filter-container') && this.document.getElementsByClassName('filter-container')[0]) {
                        if (this.document.getElementsByTagName('toolbar') && this.document.getElementsByTagName('toolbar')[0])
                            this.document.getElementsByTagName('toolbar')[0].scrollIntoView();
                        else
                            this.document.getElementsByClassName('filter-container')[0].scrollIntoView();
                    }
                    this.loading = true;

                    return this.get(this.tablePaginator);

                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    if (!data) {
                        this.loading = false;
                        return
                    }
                    return data;
                }),

        ).pipe(takeUntil(this._unsubscribeAll)).subscribe((data: any) => {
                if (!data) {
                    this.loading = false;
                    return
                }
                if (data.data && data.data.length > 0) {
                    let selectedRows = [];
                    data.data.forEach(row => { if (row.selected) selectedRows.push(row) });
                    this.selectionTable = new SelectionModel<any>(true, selectedRows);
                }
                this.dataSourceTable.next(data);
                setTimeout(() => { this.loading = false; }, 5);
            });

    }
    dataSet() {

    }
    checkItem(event: any, row) {
        if (event.checked == true) {
            this.selectionTable.clear();

            this.selectionTable.toggle(row);
        }
        else {
            this.selectionTable.clear();
        }

        this.selectionItem.emit(this.selectionTable);

    }
    onPageChange() {
        this.newItemEvent.emit(this.tablePaginator);
    }

    isAllSelectedTable() {
        const numSelected = this.selectionTable.selected.length;
        const numRows = this.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggleTable() {
        this.isAllSelectedTable() ?
            this.selectionTable.clear() :
            this.data.forEach(row => this.selectionTable.select(row));
        this.selectionItem.emit(this.selectionTable);

    }

    /** The label for the checkbox on the passed row */
    checkboxLabelTable(row?: any): string {
        if (!row) {
            return `${this.isAllSelectedTable() ? 'select' : 'deselect'} all`;
        }
        return `${this.selectionTable.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
    }




    applyFilter(event: Event) {
        this.repSearch = this.searchText.replace(/ی/g, "ي").replace(/ک/g, "ك");
    }
    checkExpand(element, dataIndex) {

        if (this.expandedElement && this.expandedElement == element)
            this.expandedElement = null;
        else {
            this.expandedElement = element;
            this.expandMethod(element, dataIndex);
        }
        //fixed: scroll problem in fitler-grid pages
        //set min height of peykar filter-grid page to the height of absolutely positioned grid-container
        setTimeout(() => {
            if (this.document.getElementsByClassName("peykar-filter-grid-page") && this.document.getElementsByClassName("grid-container") && this.document.getElementsByClassName("grid-container")[0] && this.document.getElementsByClassName("peykar-filter-grid-page")[0]) {

                let tempHeight = (this.document.getElementsByClassName("grid-container")[0].offsetHeight + 180) + 'px';

                this.document.getElementsByClassName("peykar-filter-grid-page")[0].style.minHeight = tempHeight;
                //this.document.getElementsByClassName("peykar-filter-grid-page")[0].style.maxHeight = tempHeight;
                //this.document.getElementsByClassName("peykar-filter-grid-page")[0].style.height = tempHeight;
            }
        }, 250) //expantion animation duration!
    }

    getExcelFile() {
        if (this.exportToExcle == 'notMethod') {
            return false
        }
        this.loadExcel = true;
        return this.exportToExcle().pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
            this.loadExcel = false;
            if (!data) {
                return false
            }
            const url =  '/File/DownloadTempFile?fileType=' + data.fileType + '&fileToken=' + data.fileToken + '&fileName=' + data.fileName;
            location.href = url; //TODO: This causes reloading of same page in Firefox
        });

    }

    checkType(i) {
        if (typeof i === 'object')
            return true;
        else
            return false;
    }
    getDatas(event) {
        this.loading = true;
        this.getData(event).then(res => {
            this.loading = false;
        });

    
     

    }

    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
