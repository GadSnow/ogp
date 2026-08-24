import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { EvenementService } from '@/app/apps/evenement/evenement.service';
import { TypeEvenementService } from '@/app/apps/type-evenement/type-evenement.service';
import { PanneauService } from '@/app/apps/panneau/panneau.service';
import { UsersService } from '@/app/apps/users/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { TypeEvenement } from '@/app/apps/type-evenement/type-evenement.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { User } from '@/app/apps/users/users.types';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'app-edit-evenement',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton, InputNumberModule, DatePicker],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditEvenement implements OnInit {
    private evenementService = inject(EvenementService);
    private typeEvenementService = inject(TypeEvenementService);
    private panneauService = inject(PanneauService);
    private usersService = inject(UsersService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingUsers = signal(false);

    typesEvenement: TypeEvenement[] = [];
    panneaux: Panneau[] = [];
    users: User[] = [];

    form: FormGroup;
    idEvenement: string | null = null;

    constructor() {
        this.form = this.fb.group({
            dateEvenement: ['', Validators.required],
            commentaire: [''],
            coutTotal: [0, Validators.required],
            idTypeEvenement: ['', Validators.required],
            idPanneau: ['', Validators.required],
            idUser: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadInitialData();

        this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            this.idEvenement = params.get('id');
            if (this.idEvenement) this.loadEvenement(this.idEvenement);
        });
    }

    loadInitialData() {
        this.typeEvenementService.getTypesEvenement()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => { this.typesEvenement = res.data; });

        this.panneauService.getPanneaux()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => { this.panneaux = res.data; });

        this.loadingUsers.set(true);
        this.usersService.getUsers()
            .pipe(finalize(() => this.loadingUsers.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe(res => { this.users = res.data; });
    }

    loadEvenement(id: string) {
        this.isLoading.set(true);
        this.evenementService.getEvenement(id)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (response) => {
                    const data = response.data;

                    let eventDate: Date | null = null;
                    if (data.dateEvenement) {
                        const d = new Date(data.dateEvenement);
                        if (!isNaN(d.getTime())) eventDate = d;
                    }

                    this.form.patchValue({
                        dateEvenement: eventDate,
                        commentaire: data.commentaire,
                        coutTotal: data.coutTotal,
                        idTypeEvenement: data.typeEvenement?.id,
                        idPanneau: data.panneau?.id,
                        idUser: data.user?.id ?? null
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
            message: 'Voulez-vous effectuer cette modification ?',
            header: "Confirmation de la modification",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        if (!this.idEvenement) return;
        this.isLoading.set(true);

        const idTypeEvenement = this.form.get('idTypeEvenement')?.value;
        const idPanneau = this.form.get('idPanneau')?.value;
        const idUser = this.form.get('idUser')?.value;
        const formValue = { ...this.form.getRawValue() };

        delete formValue.idTypeEvenement;
        delete formValue.idPanneau;
        delete formValue.idUser;

        formValue.id = this.idEvenement;
        formValue.dateEvenement = this.formatDate(formValue.dateEvenement);

        this.evenementService
            .updateEvenement(idTypeEvenement, idPanneau, idUser, formValue)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/evenement']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
