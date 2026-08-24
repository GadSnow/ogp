import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { QuartierService } from '@/app/apps/quartier/quartier.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { Commune } from '@/app/apps/commune/commune.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Quartier } from '@/app/apps/quartier/quartier';


@Component({
    selector: 'app-edit-quartier',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditQuartier implements OnInit {
    private quartierService = inject(QuartierService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);
    communes: Commune[] = [];

    form: FormGroup;
    idQuartier: string | null = null;

    constructor() {
        this.form = this.fb.group({
            quartier: ['', Validators.required],
            idCommune: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idQuartier = params.get('id');
            if (this.idQuartier) {
                this.loadCommunes();
                this.loadQuartier(this.idQuartier);
            }
        });
    }

    loadCommunes() {
        this.quartierService
            .getQuartiers()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Quartier[]>) => {
                    this.communes = response.data.map((q: any) => q.commune);
                    // Remove duplicates
                    this.communes = Array.from(new Map(this.communes.map(c => [c.id, c])).values());
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }

    loadQuartier(id: string): void {
        this.isLoading.set(true);
        this.quartierService
            .getQuartier(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        quartier: data.data.quartier,
                        idCommune: data.data.commune.id
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
        if (!this.idQuartier) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const idCommune = this.form.get('idCommune')?.value;
        const quartierData = { quartier: this.form.get('quartier')?.value };

        this.quartierService
            .updateQuartier(idCommune, quartierData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/quartier']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
