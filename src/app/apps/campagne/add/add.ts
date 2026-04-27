import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { CampagneService } from '@/app/apps/campagne/campagne.service';
import { StatutCampagneService } from '@/app/apps/campagne/statut-campagne.service';
import { StatutCampagne } from '@/app/apps/campagne/statut-campagne.types';
import { ClientService } from '@/app/apps/client/client.service';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Skeleton } from 'primeng/skeleton';
import { Client } from '@/app/apps/client/client.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { CampagnePayload } from '@/app/apps/campagne/campagne.types';

@Component({
    selector: 'app-add-campagne',
    imports: [Button, InputText, Select, MultiSelectModule, DatePicker, ToastModule, ConfirmDialogModule, ReactiveFormsModule, Skeleton, RouterLink],
    templateUrl: './add.html',
    providers: [ConfirmationService, MessageService]
})
export class AddCampagne implements OnInit {
    private campagneService = inject(CampagneService);
    private statutCampagneService = inject(StatutCampagneService);
    private clientService = inject(ClientService);
    private panneauService = inject(PanneauService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingClients = signal(false);
    loadingPanneaux = signal(false);
    loadingStatuts = signal(false);

    clients: Client[] = [];
    panneaux: Panneau[] = [];
    statuts: StatutCampagne[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            nomCampagne: ['', Validators.required],
            description: [''],
            dateDebut: [null, Validators.required],
            dateFin: [null, Validators.required],
            cycle: ['', Validators.required],
            statut: [null, Validators.required],
            idClient: ['', Validators.required],
            selectedPanneaux: [[], Validators.required]
        });
    }

    ngOnInit() {
        this.loadClients();
        this.loadPanneaux();
        this.loadStatuts();
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
        });
    }

    loadStatuts() {
        this.loadingStatuts.set(true);
        this.statutCampagneService.getStatuts().pipe(finalize(() => this.loadingStatuts.set(false)), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
            this.statuts = res.data;
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
            message: 'Voulez-vous créer cette campagne ?',
            header: "Confirmation",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        this.isLoading.set(true);

        const { idClient, selectedPanneaux, ...campagneData } = this.form.getRawValue();
        const selectedClient = this.clients.find(c => c.id === idClient);
        const clientMsisdn = selectedClient?.telephoneResponsable || '';
        
        const payload: CampagnePayload = {
            campagne: {
                ...campagneData,
                dateDebut: this.formatDate(campagneData.dateDebut),
                dateFin: this.formatDate(campagneData.dateFin)
            },
            panneauxIds: selectedPanneaux.map((p: any) => p.id)
        };

        this.campagneService
            .addCampagne(clientMsisdn, payload)
            .pipe(
                finalize(() => this.isLoading.set(false)),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Campagne créée avec succès' });
                    this.router.navigate(['/ogp/campagne']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
