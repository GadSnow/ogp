import {Component, Input} from '@angular/core';
import {SkeletonModule} from 'primeng/skeleton';


@Component({
    selector: 'app-skeleton-table',
    styleUrls: ['./skeleton-table.component.scss'],
    imports: [
        SkeletonModule,
    ],
    templateUrl: './skeleton-table.component.html'
})
export class SkeletonTableComponent {
    @Input() rows: number = 11;
    @Input() columns: number = 5;

    get rowsArray(): any[] {
        return Array(this.rows);
    }

    get columnsArray(): any[] {
        return Array(this.columns);
    }
}
