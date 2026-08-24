import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButton } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Skeleton } from 'primeng/skeleton';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { PermissionsService } from '@/app/apps/profils/permissions.service';
import { AddProfilPayload, Permission, PermissionGroup } from '@/app/apps/profils/profils.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';

@Component({
    selector: 'app-edit-profil',
    imports: [Button, InputText, TableModule, RadioButton, ToastModule, Skeleton, RouterLink, ReactiveFormsModule, FormsModule, SkeletonTableComponent],
    templateUrl: './edit.html',
    providers: [MessageService]
})
export class EditProfil {
    private profilsService = inject(ProfilsService);
    private permissionsService = inject(PermissionsService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    step = signal(1);
    isLoading = signal(false);
    loadingData = signal(false);
    idProfil: string | null = null;

    permissionGroups: PermissionGroup[] = [];

    form: FormGroup = this.fb.group({
        profil: ['', Validators.required],
        description: ['']
    });

    constructor() {
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            this.idProfil = params.get('id');
            if (this.idProfil) {
                this.loadData(this.idProfil);
            }
        });
    }

    private loadData(id: string) {
        this.loadingData.set(true);
        forkJoin([
            this.profilsService.getProfil(id),
            this.permissionsService.getPermissions()
        ])
        .pipe(finalize(() => this.loadingData.set(false)), takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: ([profilRes, permissionsRes]) => {
                const { profils, permission } = profilRes.data;

                this.form.patchValue({
                    profil: profils.profil,
                    description: profils.description
                });

                const assignedCodes = new Set(permission.map(p => p.code));
                this.permissionGroups = this.groupPermissions(permissionsRes.data, assignedCodes);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données' });
            }
        });
    }

    private groupPermissions(permissions: Permission[], assignedCodes: Set<string>): PermissionGroup[] {
        const map = new Map<string, PermissionGroup>();
        for (const perm of permissions) {
            if (!map.has(perm.module)) {
                map.set(perm.module, {
                    module: perm.module,
                    displayedLabel: perm.displayedLabel,
                    viewOnlyId: null,
                    fullAccessId: null,
                    selection: null
                });
            }
            const group = map.get(perm.module)!;
            if (perm.code.endsWith('.view_only')) {
                group.viewOnlyId = perm.id;
                if (assignedCodes.has(perm.code)) group.selection = 'view_only';
            } else if (perm.code.endsWith('.full_access')) {
                group.fullAccessId = perm.id;
                if (assignedCodes.has(perm.code)) group.selection = 'full_access';
            }
        }
        return Array.from(map.values());
    }

    goToStep2() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.step.set(2);
    }

    submit() {
        this.confirmationService.confirm({
            message: 'Voulez-vous modifier ce profil ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    private validate() {
        if (!this.idProfil) return;
        this.isLoading.set(true);

        const { profil, description } = this.form.getRawValue();

        const permissions: { idPermission: string; btEnabled: boolean }[] = [];
        for (const group of this.permissionGroups) {
            if (group.viewOnlyId) {
                permissions.push({ idPermission: group.viewOnlyId, btEnabled: group.selection === 'view_only' });
            }
            if (group.fullAccessId) {
                permissions.push({ idPermission: group.fullAccessId, btEnabled: group.selection === 'full_access' });
            }
        }

        const payload: AddProfilPayload = {
            profils: { id: this.idProfil, profil, description },
            permissions
        };

        this.profilsService.updateProfil(payload)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profil modifié avec succès' });
                    this.router.navigate(['/ogp/profils']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur lors de la modification' });
                }
            });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
