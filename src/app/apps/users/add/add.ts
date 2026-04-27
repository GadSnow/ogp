import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '@/app/apps/users/users.service';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { Profil } from '@/app/apps/profils/profils.types';

@Component({
    selector: 'app-add-user',
    imports: [Button, InputText, Select, ToastModule, ConfirmDialogModule, RouterLink, ReactiveFormsModule],
    templateUrl: './add.html',
    providers: [ConfirmationService, MessageService]
})
export class AddUser {
    private usersService = inject(UsersService);
    private profilsService = inject(ProfilsService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingProfils = signal(false);
    profils: Profil[] = [];

    form: FormGroup = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        msisdn: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        role: ['', Validators.required],
        idProfile: [null, Validators.required]
    });

    constructor() {
        this.loadProfils();
    }

    private loadProfils() {
        this.loadingProfils.set(true);
        this.profilsService.getProfils()
            .pipe(finalize(() => this.loadingProfils.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (res) => { this.profils = res.data; },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les profils' });
                }
            });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.confirmationService.confirm({
            message: 'Voulez-vous créer cet utilisateur ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    private validate() {
        this.isLoading.set(true);
        const { idProfile, ...payload } = this.form.getRawValue();

        this.usersService.addUser(idProfile, payload)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur créé avec succès' });
                    this.router.navigate(['/ogp/users']);
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
