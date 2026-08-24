import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CaracteristiquePanneauxService } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { CategoriePanneauxService } from '@/app/apps/categorie-panneaux/categorie-panneaux.service';

@Component({
    selector: 'app-edit-caracteristique-panneaux',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditCaracteristiquePanneaux implements OnInit {
    private caracteristiqueService = inject(CaracteristiquePanneauxService);
    private categorieService = inject(CategoriePanneauxService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);
    categories: CategoriePanneaux[] = [];

    form: FormGroup;
    idCaracteristique: string | null = null;

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

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idCaracteristique = params.get('id');
            if (this.idCaracteristique) {
                this.loadCategories();
                this.loadCaracteristique(this.idCaracteristique);
            }
        });
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

    loadCaracteristique(id: string): void {
        this.isLoading.set(true);
        this.caracteristiqueService
            .getCaracteristique(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        type: data.data.type,
                        caracteristique: data.data.caracteristique,
                        dimenssion: data.data.dimenssion,
                        longeur: data.data.longeur,
                        largeur: data.data.largeur,
                        idCategoriePanneaux: data.data.categoriePanneaux.id
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
        if (!this.idCaracteristique) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const idCategoriePanneaux = this.form.get('idCategoriePanneaux')?.value;
        const formValue = { ...this.form.value };
        delete formValue.idCategoriePanneaux;
        formValue.id = this.idCaracteristique;

        this.caracteristiqueService
            .updateCaracteristique(idCategoriePanneaux, formValue)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/caracteristique-panneaux']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
