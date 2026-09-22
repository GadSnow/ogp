import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FactureService } from '@/app/apps/facture/facture.service';
import { RegieService } from '@/app/apps/regie/regie.service';
import { Regie } from '@/app/apps/regie/regie.types';

/**
 * Facture de redevance : sans campagne, montant saisi à la main. Les autres
 * types de facture (campagne, autorisation) restent générés depuis la fiche campagne.
 */
@Component({
    selector: 'app-add-facture',
    imports: [Button, InputNumberModule, Select, Skeleton, ToastModule, ReactiveFormsModule, RouterLink],
    templateUrl: './add.html',
    providers: [MessageService]
})
export class AddFacture implements OnInit {
    private factureService = inject(FactureService);
    private regieService = inject(RegieService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingRegies = signal(false);

    regies: Regie[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            idRegie: ['', Validators.required],
            montantBrute: [null, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit() {
        this.loadRegies();
    }

    loadRegies() {
        this.loadingRegies.set(true);
        this.regieService
            .getRegies()
            .pipe(
                finalize(() => this.loadingRegies.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (res) => {
                    this.regies = res.data ?? [];
                }
            });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    submit(): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous générer cette facture de redevance ?',
            header: 'Confirmation de la génération',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        this.isLoading.set(true);

        this.factureService
            .addFacture(this.form.value)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Facture de redevance générée avec succès' });
                    this.router.navigate(['/ogp/facture']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
