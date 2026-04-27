import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { forkJoin, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { PermissionsService } from '@/app/apps/profils/permissions.service';
import { Permission, Profil } from '@/app/apps/profils/profils.types';

interface PermissionDetailRow {
    displayedLabel: string;
    viewOnlyExists: boolean;
    fullAccessExists: boolean;
    viewOnlyAssigned: boolean;
    fullAccessAssigned: boolean;
}

@Component({
    selector: 'app-detail-profil',
    imports: [RouterLink, TableModule, Skeleton],
    templateUrl: './detail.html'
})
export class DetailProfil {
    private profilsService = inject(ProfilsService);
    private permissionsService = inject(PermissionsService);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(true);
    profil: Profil | null = null;
    permissionRows: PermissionDetailRow[] = [];

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            const id = params.get('id');
            if (id) this.loadData(id);
        });
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        forkJoin([
            this.profilsService.getProfil(id),
            this.permissionsService.getPermissions()
        ])
        .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: ([profilRes, permissionsRes]) => {
                this.profil = profilRes.data.profils;
                const assignedCodes = new Set(profilRes.data.permission.map(p => p.code));
                this.permissionRows = this.buildRows(permissionsRes.data, assignedCodes);
            }
        });
    }

    private buildRows(allPermissions: Permission[], assignedCodes: Set<string>): PermissionDetailRow[] {
        const map = new Map<string, PermissionDetailRow>();

        for (const perm of allPermissions) {
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
                row.viewOnlyAssigned = assignedCodes.has(perm.code);
            } else if (perm.code.endsWith('.full_access')) {
                row.fullAccessExists = true;
                row.fullAccessAssigned = assignedCodes.has(perm.code);
            }
        }

        return Array.from(map.values());
    }
}
