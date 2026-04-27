import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersService } from '@/app/apps/users/users.service';
import { Permission } from '@/app/apps/profils/profils.types';
import { User } from '@/app/apps/users/users.types';

interface PermissionDetailRow {
    displayedLabel: string;
    viewOnlyExists: boolean;
    fullAccessExists: boolean;
    viewOnlyAssigned: boolean;
    fullAccessAssigned: boolean;
}

@Component({
    selector: 'app-detail-user',
    imports: [RouterLink, TableModule, Tag, Skeleton, TabsModule],
    templateUrl: './detail.html'
})
export class DetailUser {
    private usersService = inject(UsersService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    user: User | null = null;
    permissionRows: PermissionDetailRow[] = [];

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        this.usersService.getUser(id)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    this.user = res.data.user;
                    this.permissionRows = this.buildRows(res.data.permissions);
                }
            });
    }

    private buildRows(permissions: Permission[]): PermissionDetailRow[] {
        const map = new Map<string, PermissionDetailRow>();

        for (const perm of permissions) {
            if (!map.has(perm.module)) {
                map.set(perm.module, {
                    displayedLabel: perm.displayedLabel,
                    viewOnlyExists: false,
                    fullAccessExists: false,
                    viewOnlyAssigned: false,
                    fullAccessAssigned: false
                });
            }
            const row = map.get(perm.module)!;
            if (perm.code.endsWith('.view_only')) {
                row.viewOnlyExists = true;
                row.viewOnlyAssigned = perm.btEnabled;
            } else if (perm.code.endsWith('.full_access')) {
                row.fullAccessExists = true;
                row.fullAccessAssigned = perm.btEnabled;
            }
        }

        return Array.from(map.values());
    }

    getSeverity(status: boolean) {
        return status ? 'success' : 'danger';
    }

    getStatus(status: boolean) {
        return status ? 'Actif' : 'Inactif';
    }
}
