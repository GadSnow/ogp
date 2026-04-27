import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { RadioButton } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Skeleton } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { PermissionsService } from '@/app/apps/profils/permissions.service';
import { AddProfilPayload, Permission, PermissionGroup } from '@/app/apps/profils/profils.types';
import { SkeletonTableComponent } from '@/app/shared/utils/components/skeleton-table/skeleton-table.component';

@Component({
    selector: 'app-add-profil',
    imports: [Button, InputText, TableModule, RadioButton, ToastModule, ConfirmDialogModule, RouterLink, ReactiveFormsModule, FormsModule, SkeletonTableComponent],
    templateUrl: './add.html',
    providers: [ConfirmationService, MessageService]
})
export class AddProfil {
    private profilsService = inject(ProfilsService);
    private permissionsService = inject(PermissionsService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    step = signal(1);
    isLoading = signal(false);
    loadingPermissions = signal(false);

    permissionGroups: PermissionGroup[] = [];

    form: FormGroup = this.fb.group({
        profil: ['', Validators.required],
        description: ['']
    });

    goToStep2() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.step.set(2);
        if (this.permissionGroups.length === 0) {
            this.loadPermissions();
        }
    }

    loadPermissions() {
        this.loadingPermissions.set(true);
        this.permissionsService.getPermissions()
            .pipe(finalize(() => this.loadingPermissions.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => {
                    this.permissionGroups = this.groupPermissions(res.data);
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les permissions' });
                }
            });
    }

    private groupPermissions(permissions: Permission[]): PermissionGroup[] {
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
            if (perm.code.endsWith('.view_only')) group.viewOnlyId = perm.id;
            else if (perm.code.endsWith('.full_access')) group.fullAccessId = perm.id;
        }
        return Array.from(map.values());
    }

    submit() {
        this.confirmationService.confirm({
            message: 'Voulez-vous créer ce profil ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    private validate() {
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
            profils: { profil, description },
            permissions
        };

        this.profilsService.addProfil(payload)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Profil créé avec succès' });
                    this.router.navigate(['/ogp/profils']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message || 'Erreur lors de la création' });
                }
            });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }
}
