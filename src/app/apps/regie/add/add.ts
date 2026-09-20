import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Skeleton } from 'primeng/skeleton';
import { RegieService } from '@/app/apps/regie/regie.service';
import { AddRegie as AddRegiePayload } from '@/app/apps/regie/regie.types';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-add-regie',
    imports: [Button, InputText, Skeleton, ReactiveFormsModule],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddRegie {
    private regieService = inject(RegieService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            denomination: ['', Validators.required],
            sigle: [''],
            nomResponsable: ['', Validators.required],
            prenomResponsable: ['', Validators.required],
            emailResponsable: ['', Validators.email],
            telephoneResponsable: ['', Validators.required],
            adresse: ['', Validators.required]
        });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    submit(): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous effectuer cet enregistrement ?',
            header: "Confirmation de l'enregistrement",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        this.isLoading.set(true);

        const payload: AddRegiePayload = { ...this.form.value };

        this.regieService
            .addRegie(payload)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/regie']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || err.statusText || 'Erreur' });
                }
            });
    }
}
