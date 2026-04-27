import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Skeleton } from 'primeng/skeleton';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '@/app/apps/users/users.service';
import { ProfilsService } from '@/app/apps/profils/profils.service';
import { Profil } from '@/app/apps/profils/profils.types';

@Component({
    selector: 'app-edit-user',
    imports: [Button, InputText, Select, ToastModule, ConfirmDialogModule, Skeleton, RouterLink, ReactiveFormsModule],
    templateUrl: './edit.html',
    providers: [ConfirmationService, MessageService]
})
export class EditUser {
    private usersService = inject(UsersService);
    private profilsService = inject(ProfilsService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingData = signal(false);
    idUser: string | null = null;
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
        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            this.idUser = params.get('id');
            if (this.idUser) this.loadData(this.idUser);
        });
    }

    private loadData(id: string) {
        this.loadingData.set(true);
        forkJoin([
            this.usersService.getUser(id),
            this.profilsService.getProfils()
        ])
        .pipe(finalize(() => this.loadingData.set(false)), takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: ([userRes, profilsRes]) => {
                this.profils = profilsRes.data;
                const user = userRes.data.user;
                this.form.patchValue({
                    nom: user.nom,
                    prenom: user.prenom,
                    msisdn: user.msisdn,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                    idProfile: user.profils?.id ?? null
                });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données' });
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.confirmationService.confirm({
            message: 'Voulez-vous modifier cet utilisateur ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    private validate() {
        if (!this.idUser) return;
        this.isLoading.set(true);

        const { idProfile, ...rest } = this.form.getRawValue();
        const payload = { id: this.idUser, ...rest };

        this.usersService.updateUser(idProfile, payload)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Utilisateur modifié avec succès' });
                    this.router.navigate(['/ogp/users']);
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
