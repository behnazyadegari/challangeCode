import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseMasonryModule } from '@fuse/components/masonry';
import { SharedModule } from 'app/shared/shared.module';
import { UnitListComponent } from './unitList.component';
import { UnitListgRoutes } from './unitList.routing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [UnitListComponent],
    imports: [
        RouterModule.forChild(UnitListgRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSidenavModule,
        FuseMasonryModule,
        SharedModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule
    ],
})
export class UnitListModule {}
