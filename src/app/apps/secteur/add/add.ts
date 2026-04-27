import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SecteurService } from '@/app/apps/secteur/secteur.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { Quartier } from '@/app/apps/quartier/quartier.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Secteur } from '@/app/apps/secteur/secteur.types';
import { QuartierService } from '@/app/apps/quartier/quartier.service';

@Component({
    selector: 'app-add-secteur',
    imports: [Button, InputText, Select, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss',
    providers: [ConfirmationService]
})
export class AddSecteur implements OnInit {
    private secteurService = inject(SecteurService);
    private quartierService = inject(QuartierService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);
    quartiers: Quartier[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            secteur: ['', Validators.required],
            idQuartier: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadQuartiers();
    }

    loadQuartiers() {
        this.quartierService
            .getQuartiers()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Quartier[]>) => {
                    this.quartiers = response.data;
                },
                error: (error) => {

                }
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

        const idQuartier = this.form.get('idQuartier')?.value;
        const secteurData = { secteur: this.form.get('secteur')?.value };

        this.secteurService
            .addSecteur(idQuartier, secteurData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/secteur']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
