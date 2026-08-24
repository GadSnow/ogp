import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TarifService } from '@/app/apps/tarif/tarif.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Skeleton } from 'primeng/skeleton';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';
import { CategoriePanneauxService } from '@/app/apps/categorie-panneaux/categorie-panneaux.service';
import { CaracteristiquePanneauxService } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.service';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-add-tarif',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton, CheckboxModule, InputNumberModule],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddTarif implements OnInit {
    private tarifService = inject(TarifService);
    private categoryPanneauxService = inject(CategoriePanneauxService);
    private characteristicPanneauxService = inject(CaracteristiquePanneauxService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingCategories = signal(false);
    loadingCaracteristiques = signal(false);

    categories: CategoriePanneaux[] = [];
    caracteristiques: CaracteristiquePanneaux[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            priceDay: [0, Validators.required],
            priceWeek: [0, Validators.required],
            priceMonth: [0, Validators.required],
            btEnabled: [true],
            idCategorie: ['', Validators.required],
            idCaracteristiquePanneaux: [{value: '', disabled: true}, Validators.required]
        });
    }

    ngOnInit() {
        this.loadCategories();

        this.form.get('idCategorie')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
            if (this.form.get('idCategorie')?.value !== id) return;
            this.form.get('idCaracteristiquePanneaux')?.reset();
            this.caracteristiques = [];
            if (id) {
                this.form.get('idCaracteristiquePanneaux')?.enable();
                this.loadCaracteristiques(id);
            } else {
                this.form.get('idCaracteristiquePanneaux')?.disable();
            }
        });
    }

    loadCategories() {
        this.loadingCategories.set(true);
        this.categoryPanneauxService.getCategoriesPanneaux().pipe(
            finalize(() => this.loadingCategories.set(false)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(res => {
            this.categories = res.data;
        });
    }

    loadCaracteristiques(idCategorie: string) {
        this.loadingCaracteristiques.set(true);
        this.characteristicPanneauxService.getCaracteristiquesByCategorie(idCategorie).pipe(
            finalize(() => this.loadingCaracteristiques.set(false)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(res => {
            this.caracteristiques = res.data;
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

        const { idCaracteristiquePanneaux, idCategorie, ...formValue } = this.form.getRawValue();

        this.tarifService
            .addTarif(idCaracteristiquePanneaux, formValue)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/tarif']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
