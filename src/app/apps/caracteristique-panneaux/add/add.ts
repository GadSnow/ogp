import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CaracteristiquePanneauxService } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { CategoriePanneauxService } from '@/app/apps/categorie-panneaux/categorie-panneaux.service';

@Component({
    selector: 'app-add-caracteristique-panneaux',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddCaracteristiquePanneaux implements OnInit {
    private caracteristiqueService = inject(CaracteristiquePanneauxService);
    private categorieService = inject(CategoriePanneauxService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);
    categories: CategoriePanneaux[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            type: ['', Validators.required],
            caracteristique: ['', Validators.required],
            dimenssion: ['', Validators.required],
            longeur: [0, Validators.required],
            largeur: [0, Validators.required],
            idCategoriePanneaux: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.categorieService
            .getCategoriesPanneaux()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<CategoriePanneaux[]>) => {
                    this.categories = response.data;
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

        const idCategoriePanneaux = this.form.get('idCategoriePanneaux')?.value;
        const formValue = { ...this.form.value };
        delete formValue.idCategoriePanneaux;

        this.caracteristiqueService
            .addCaracteristique(idCategoriePanneaux, formValue)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/caracteristique-panneaux']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
