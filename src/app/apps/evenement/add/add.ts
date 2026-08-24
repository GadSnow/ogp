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
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { TypeEvenement } from '@/app/apps/type-evenement/type-evenement.types';
import { Panneau } from '@/app/apps/panneau/panneau.types';
import { User } from '@/app/apps/users/users.types';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'app-add-evenement',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton, InputNumberModule, DatePicker],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddEvenement implements OnInit {
    private evenementService = inject(EvenementService);
    private typeEvenementService = inject(TypeEvenementService);
    private panneauService = inject(PanneauService);
    private usersService = inject(UsersService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    isLoading = signal(false);
    loadingUsers = signal(false);

    typesEvenement: TypeEvenement[] = [];
    panneaux: Panneau[] = [];
    users: User[] = [];

    form: FormGroup;

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
            message: 'Voulez-vous effectuer cet enregistrement ?',
            header: "Confirmation de l'enregistrement",
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.validate()
        });
    }

    validate() {
        this.isLoading.set(true);

        const idTypeEvenement = this.form.get('idTypeEvenement')?.value;
        const idPanneau = this.form.get('idPanneau')?.value;
        const idUser = this.form.get('idUser')?.value;

        const formValue = {
            ...this.form.value,
            dateEvenement: this.formatDate(this.form.value.dateEvenement)
        };

        delete formValue.idTypeEvenement;
        delete formValue.idPanneau;
        delete formValue.idUser;

        this.evenementService
            .addEvenement(idTypeEvenement, idPanneau, idUser, formValue)
            .pipe(finalize(() => this.isLoading.set(false)), takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/evenement']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || 'Erreur' });
                }
            });
    }
}
