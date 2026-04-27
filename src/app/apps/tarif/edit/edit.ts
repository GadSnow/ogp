import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TarifService } from '@/app/apps/tarif/tarif.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    selector: 'app-edit-tarif',
    imports: [Button, InputText, Select, ConfirmDialogModule, ReactiveFormsModule, Skeleton, CheckboxModule, InputNumberModule],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditTarif implements OnInit {
    private tarifService = inject(TarifService);
    private categoryPanneauxService = inject(CategoriePanneauxService);
    private characteristicPanneauxService = inject(CaracteristiquePanneauxService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingCategories = signal(false);
    loadingCaracteristiques = signal(false);

    categories: CategoriePanneaux[] = [];
    caracteristiques: CaracteristiquePanneaux[] = [];

    form: FormGroup;
    idTarif: string | null = null;
    isSettingInitialValues = false;

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
            if (this.isSettingInitialValues) return;
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

        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            this.idTarif = params.get('id');
            if (this.idTarif) {
                this.loadTarif(this.idTarif);
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

    loadTarif(id: string) {
        this.isLoading.set(true);
        this.tarifService.getTarif(id).pipe(
            finalize(() => this.isLoading.set(false)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (response) => {
                const data = response.data;
                const caract = data.caracteristiquePanneaux;
                const cat = caract?.categoriePanneaux;

                if (cat) this.loadCaracteristiques(cat.id);

                this.isSettingInitialValues = true;

                this.form.patchValue({
                    priceDay: data.priceDay,
                    priceWeek: data.priceWeek,
                    priceMonth: data.priceMonth,
                    btEnabled: data.btEnabled,
                    idCategorie: cat?.id,
                    idCaracteristiquePanneaux: caract?.id
                });

                if (cat) this.form.get('idCaracteristiquePanneaux')?.enable();

                setTimeout(() => {
                    this.isSettingInitialValues = false;
                });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error?.message });
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
            header: "Confirmation de la modification",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        this.isLoading.set(true);

        if (!this.idTarif) return;

        const { idCaracteristiquePanneaux, idCategorie, ...formValue } = this.form.getRawValue();
        formValue.id = this.idTarif;

        this.tarifService
            .updateTarif(idCaracteristiquePanneaux, formValue)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/tarif']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
