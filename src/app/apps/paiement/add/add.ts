import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Textarea } from 'primeng/textarea';
import { Skeleton } from 'primeng/skeleton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaiementService } from '@/app/apps/paiement/paiement.service';
import { ModePaiementService } from '@/app/apps/mode-paiement/mode-paiement.service';
import { ModePaiement } from '@/app/apps/mode-paiement/mode-paiement.types';

@Component({
    selector: 'app-add-paiement',
    imports: [Button, InputText, InputNumberModule, Select, Textarea, Skeleton, ToastModule, ConfirmDialogModule, ReactiveFormsModule, RouterLink],
    templateUrl: './add.html',
    providers: [ConfirmationService, MessageService]
})
export class AddPaiement implements OnInit {
    private paiementService = inject(PaiementService);
    private modePaiementService = inject(ModePaiementService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingModes = signal(false);

    modes: ModePaiement[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            referenceFacture: ['', Validators.required],
            montant: [null, [Validators.required, Validators.min(1)]],
            modePaiement: ['', Validators.required],
            message: ['']
        });
    }

    ngOnInit() {
        this.loadModes();
    }

    loadModes() {
        this.loadingModes.set(true);
        this.modePaiementService
            .getModesPaiement()
            .pipe(finalize(() => this.loadingModes.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({ next: (res) => { this.modes = res.data ?? []; } });
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

        this.paiementService
            .addPaiement(this.form.value)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Paiement enregistré avec succès' });
                    this.router.navigate(['/ogp/paiement']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
