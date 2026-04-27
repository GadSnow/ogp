import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { ModePaiementService } from '@/app/apps/mode-paiement/mode-paiement.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ModePaiement } from '@/app/apps/mode-paiement/mode-paiement.types';
import { Skeleton } from 'primeng/skeleton';


@Component({
    selector: 'app-edit-mode-paiement',
    imports: [Button, InputText, Textarea, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditModePaiement implements OnInit {
    private modePaiementService = inject(ModePaiementService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);

    form: FormGroup;
    idModePaiement: string | null = null;

    constructor() {
        this.form = this.fb.group({
            mode: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idModePaiement = params.get('id');
            if (this.idModePaiement) {
                this.loadModePaiement(this.idModePaiement);
            }
        });
    }

    loadModePaiement(id: string): void {
        this.isLoading.set(true);
        this.modePaiementService
            .getModePaiement(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        mode: data.data.mode,
                        description: data.data.description
                    });
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText || 'Erreur lors du chargement des données' });
                }
            });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    submit(): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous effectuer cette modification ?',
            header: 'Confirmation de la modification',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        if (!this.idModePaiement) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const updateData = { ...this.form.value, id: this.idModePaiement };

        this.modePaiementService
            .updateModePaiement(updateData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/mode-paiement']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
