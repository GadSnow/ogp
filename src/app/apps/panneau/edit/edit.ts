import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { RegionService } from '@/app/apps/region/region.service';
import { CommuneService } from '@/app/apps/commune/commune.service';
import { QuartierService } from '@/app/apps/quartier/quartier.service';
import { SecteurService } from '@/app/apps/secteur/secteur.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Skeleton } from 'primeng/skeleton';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { CaracteristiquePanneauxService } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.service';
import { CaracteristiquePanneaux } from '@/app/apps/caracteristique-panneaux/caracteristique-panneaux.types';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
    selector: 'app-edit-panneau',
    imports: [Button, InputText, Select, ConfirmDialogModule, ReactiveFormsModule, Skeleton, CheckboxModule, InputNumberModule],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditPanneau implements OnInit {
    private panneauService = inject(PanneauService);
    private caractService = inject(CaracteristiquePanneauxService);
    private regionService = inject(RegionService);
    private communeService = inject(CommuneService);
    private quartierService = inject(QuartierService);
    private secteurService = inject(SecteurService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingRegions = signal(false);
    loadingCommunes = signal(false);
    loadingQuartiers = signal(false);
    loadingSecteurs = signal(false);

    caracteristiques: CaracteristiquePanneaux[] = [];
    regions: any[] = [];
    communes: any[] = [];
    quartiers: any[] = [];
    secteurs: any[] = [];
    nombreFaces = [1, 2, 3, 4];

    form: FormGroup;
    idPanneau: string | null = null;
    isSettingInitialValues = false; // Flag to stop recursive clear


    constructor() {
        this.form = this.fb.group({
            reference: ['', Validators.required],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required],
            nombreFace: [1, Validators.required],
            btValide: [true],
            btAvailable: [true],
            hasSpecialPrice: [false],
            priceDay: [0, Validators.required],
            priceWeek: [0, Validators.required],
            priceMonth: [0, Validators.required],
            idCaracteristiquePanneau: ['', Validators.required],
            idRegion: ['', Validators.required],
            idCommune: [{value: '', disabled: true}, Validators.required],
            idQuartier: [{value: '', disabled: true}, Validators.required],
            idSecteur: [{value: '', disabled: true}, Validators.required]
        });
    }

    ngOnInit() {
        this.loadCaracteristiques();
        this.loadRegions();

        // Listen to dropdown changes
        this.form.get('idRegion')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
            if (this.isSettingInitialValues) return;
            if (this.form.get('idRegion')?.value !== id) return;
            this.form.get('idCommune')?.reset();
            this.form.get('idQuartier')?.reset();
            this.form.get('idSecteur')?.reset();
            this.communes = [];
            this.quartiers = [];
            this.secteurs = [];
            if (id) {
                this.form.get('idCommune')?.enable();
                this.loadCommunes(id);
            } else {
                this.form.get('idCommune')?.disable();
            }
            this.form.get('idQuartier')?.disable();
            this.form.get('idSecteur')?.disable();
        });

        this.form.get('idCommune')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
            if (this.isSettingInitialValues) return;
            if (this.form.get('idCommune')?.value !== id) return;
            this.form.get('idQuartier')?.reset();
            this.form.get('idSecteur')?.reset();
            this.quartiers = [];
            this.secteurs = [];
            if (id) {
                this.form.get('idQuartier')?.enable();
                this.loadQuartiers(id);
            } else {
                this.form.get('idQuartier')?.disable();
            }
            this.form.get('idSecteur')?.disable();
        });

        this.form.get('idQuartier')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(id => {
            if (this.isSettingInitialValues) return;
            if (this.form.get('idQuartier')?.value !== id) return;
            this.form.get('idSecteur')?.reset();
            this.secteurs = [];
            if (id) {
                this.form.get('idSecteur')?.enable();
                this.loadSecteurs(id);
            } else {
                this.form.get('idSecteur')?.disable();
            }
        });

        this.form.get('hasSpecialPrice')?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(hasSpecial => {
            const priceControls = ['priceDay', 'priceWeek', 'priceMonth'];
            if (!hasSpecial) {
                priceControls.forEach(ctrl => {
                    this.form.get(ctrl)?.setValue(0);
                    this.form.get(ctrl)?.clearValidators();
                    this.form.get(ctrl)?.updateValueAndValidity();
                });
            } else {
                priceControls.forEach(ctrl => {
                    this.form.get(ctrl)?.setValidators([Validators.required]);
                    this.form.get(ctrl)?.updateValueAndValidity();
                });
            }
        });

        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
            this.idPanneau = params.get('id');
            if (this.idPanneau) {
                this.loadPanneau(this.idPanneau);
            }
        });
    }

    loadCaracteristiques() {
        this.caractService.getCaracteristiques().subscribe(res => {
            this.caracteristiques = res.data;
        });
    }

    loadRegions() {
        this.loadingRegions.set(true);
        this.regionService.getRegions().pipe(finalize(() => this.loadingRegions.set(false))).subscribe(res => {
            this.regions = res.data;
        });
    }

    loadCommunes(idRegion: string) {
        this.loadingCommunes.set(true);
        this.communeService.getCommunesByRegion(idRegion).pipe(finalize(() => this.loadingCommunes.set(false))).subscribe(res => {
            this.communes = res.data;
        });
    }

    loadQuartiers(idCommune: string) {
        this.loadingQuartiers.set(true);
        this.quartierService.getQuartiersByCommune(idCommune).pipe(finalize(() => this.loadingQuartiers.set(false))).subscribe(res => {
            this.quartiers = res.data;
        });
    }

    loadSecteurs(idQuartier: string) {
        this.loadingSecteurs.set(true);
        this.secteurService.getSecteursByQuartier(idQuartier).pipe(finalize(() => this.loadingSecteurs.set(false))).subscribe(res => {
            this.secteurs = res.data;
        });
    }

    loadPanneau(id: string) {
        this.isLoading.set(true);
        this.panneauService.getPanneau(id).pipe(finalize(() => this.isLoading.set(false))).subscribe({
            next: (response) => {
                const data = response.data.panneau;
                const secteur = data.secteur;
                const quartier = secteur?.quartier;
                const commune = quartier?.commune;
                const region = commune?.region;

                // Load cascade data independently
                if (region) this.loadCommunes(region.id);
                if (commune) this.loadQuartiers(commune.id);
                if (quartier) this.loadSecteurs(quartier.id);

                this.isSettingInitialValues = true;

                this.form.patchValue({
                    reference: data.reference,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    nombreFace: data.nombreFace ?? 1,
                    btValide: data.btValide,
                    btAvailable: data.btAvailable,
                    hasSpecialPrice: data.hasSpecialPrice,
                    priceDay: data.priceDay,
                    priceWeek: data.priceWeek,
                    priceMonth: data.priceMonth,
                    idCaracteristiquePanneau: data.caracteristiquePanneaux?.id,
                    idRegion: region?.id,
                    idCommune: commune?.id,
                    idQuartier: quartier?.id,
                    idSecteur: secteur?.id
                });

                if (region) this.form.get('idCommune')?.enable();
                if (commune) this.form.get('idQuartier')?.enable();
                if (quartier) this.form.get('idSecteur')?.enable();

                // Wait a tick then re-enable listeners
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
        if (!this.idPanneau) return;
        this.isLoading.set(true);

        const { idCaracteristiquePanneau, idRegion, idCommune, idQuartier, idSecteur, ...formValue } = this.form.getRawValue();
        formValue.id = this.idPanneau;

        if (!formValue.hasSpecialPrice) {
            formValue.priceDay = 0;
            formValue.priceWeek = 0;
            formValue.priceMonth = 0;
        }

        this.panneauService
            .updatePanneau(idCaracteristiquePanneau, idSecteur, formValue)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/panneau']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
