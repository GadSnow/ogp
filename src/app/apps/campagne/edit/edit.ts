import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { StatutCampagneService } from '@/app/apps/campagne/statut-campagne.service';
import { StatutCampagne } from '@/app/apps/campagne/statut-campagne.types';
import { ClientService } from '@/app/apps/client/client.service';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Skeleton } from 'primeng/skeleton';
import { Client } from '@/app/apps/client/client.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { CampagnePayload } from '@/app/apps/campagne/campagne.types';

@Component({
    selector: 'app-edit-campagne',
    imports: [Button, InputText, Select, MultiSelectModule, DatePicker, ToastModule, ConfirmDialogModule, ReactiveFormsModule, Skeleton, RouterLink, InputNumberModule],
    templateUrl: './edit.html',
    providers: [ConfirmationService, MessageService]
})
export class EditCampagne implements OnInit {
    private campagneService = inject(CampagneService);
    private statutCampagneService = inject(StatutCampagneService);
    private clientService = inject(ClientService);
    private panneauService = inject(PanneauService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingData = signal(false);
    loadingClients = signal(false);
    loadingPanneaux = signal(false);
    loadingStatuts = signal(false);

    clients: Client[] = [];
    panneaux: Panneau[] = [];
    statuts: StatutCampagne[] = [];
    private campagnePanneauxIds: string[] = [];
    idCampagne: string | null = null;

    cycles = [
        { label: 'Journalier', value: 'JOURNALIER' },
        { label: 'Hebdomadaire', value: 'HEBDOMADAIRE' },
        { label: 'Mensuel', value: 'MENSUEL' }
    ];

    form: FormGroup;

    get dureeLabel(): string {
        const cycle = this.form?.get('cycle')?.value;
        if (cycle === 'JOURNALIER') return 'Nombre de jours';
        if (cycle === 'HEBDOMADAIRE') return 'Nombre de semaines';
        if (cycle === 'MENSUEL') return 'Nombre de mois';
        return 'Durée';
    }

    constructor() {
        this.form = this.fb.group({
            nomCampagne: ['', Validators.required],
            description: [''],
            cycle: ['', Validators.required],
            duree: [null, [Validators.required, Validators.min(1)]],
            dateDebut: [null, Validators.required],
            dateFin: [{ value: null, disabled: true }],
            statut: [null, Validators.required],
            idClient: ['', Validators.required],
            selectedPanneaux: [[], Validators.required]
        });
    }

    ngOnInit() {
        this.loadClients();
        this.loadPanneaux();
        this.loadStatuts();

        ['dateDebut', 'cycle', 'duree'].forEach(field => {
            this.form.get(field)?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.calculateDateFin());
        });

        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            this.idCampagne = params.get('id');
            if (this.idCampagne) {
                this.loadCampagne(this.idCampagne);
            }
        });
    }

    private calculateDateFin(): void {
        const dateDebut = this.form.get('dateDebut')?.value;
        const cycle = this.form.get('cycle')?.value;
        const duree = this.form.get('duree')?.value;

        if (!dateDebut || !cycle || !duree || duree < 1) {
            this.form.get('dateFin')?.setValue(null, { emitEvent: false });
            return;
        }

        const date = new Date(dateDebut);
        if (cycle === 'JOURNALIER') {
            date.setDate(date.getDate() + Number(duree));
        } else if (cycle === 'HEBDOMADAIRE') {
            date.setDate(date.getDate() + Number(duree) * 7);
        } else if (cycle === 'MENSUEL') {
            date.setMonth(date.getMonth() + Number(duree));
        }
        this.form.get('dateFin')?.setValue(date, { emitEvent: false });
    }

    loadClients() {
        this.loadingClients.set(true);
        this.clientService.getClients().pipe(finalize(() => this.loadingClients.set(false)), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
            this.clients = res.data;
        });
    }

    loadPanneaux() {
        this.loadingPanneaux.set(true);
        this.panneauService.getDisponibles().pipe(finalize(() => this.loadingPanneaux.set(false)), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
            this.panneaux = res.data;
            if (this.campagnePanneauxIds.length > 0) {
                this.form.patchValue({
                    selectedPanneaux: this.panneaux.filter(p => this.campagnePanneauxIds.includes(p.id))
                });
            }
        });
    }

    loadStatuts() {
        this.loadingStatuts.set(true);
        this.statutCampagneService.getStatuts().pipe(finalize(() => this.loadingStatuts.set(false)), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
            this.statuts = res.data;
        });
    }

    loadCampagne(id: string) {
        this.loadingData.set(true);
        this.campagneService.getCampagne(id).pipe(finalize(() => this.loadingData.set(false)), takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (res) => {
                const { campagne, panneaux } = res.data as any;
                this.campagnePanneauxIds = panneaux.map((p: any) => p.id);
                this.form.patchValue({
                    nomCampagne: campagne.nomCampagne,
                    description: campagne.description,
                    cycle: campagne.cycle,
                    duree: campagne.nombre,
                    dateDebut: new Date(campagne.dateDebut),
                    statut: campagne.statut,
                    idClient: campagne.client?.id,
                    selectedPanneaux: this.panneaux.filter(p => this.campagnePanneauxIds.includes(p.id))
                });
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger la campagne' });
            }
        });
    }

    isInvalid(field: string): boolean {
        const control = this.form.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    formatDate(date: any): string {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    submit(): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous modifier cette campagne ?',
            header: "Confirmation",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        if (!this.idCampagne) return;
        this.isLoading.set(true);

        const { idClient, selectedPanneaux, duree, ...campagneData } = this.form.getRawValue();
        campagneData.nombre = duree;
        const selectedClient = this.clients.find(c => c.id === idClient);
        const clientMsisdn = selectedClient?.telephoneResponsable || '';
        
        const payload: CampagnePayload = {
            campagne: {
                ...campagneData,
                id: this.idCampagne,
                dateDebut: this.formatDate(campagneData.dateDebut),
                dateFin: this.formatDate(campagneData.dateFin)
            },
            panneauxIds: selectedPanneaux.map((p: any) => p.id)
        };

        this.campagneService
            .updateCampagne(clientMsisdn, payload)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Campagne modifiée avec succès' });
                    this.router.navigate(['/ogp/campagne']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
