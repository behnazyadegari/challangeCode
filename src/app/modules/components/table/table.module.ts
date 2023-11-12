import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { getFarsiPaginatorIntl } from './paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { SortPipe } from './sort.pipe';


@NgModule({
    declarations: [TableComponent, SortPipe],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatSortModule,
    ],
    exports: [TableComponent],
    providers: [
        { provide: MatPaginatorIntl, useClass: getFarsiPaginatorIntl }
    ]
})
export class TableModule { }
