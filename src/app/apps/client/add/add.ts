import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ClientService } from '@/app/apps/client/client.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { TypeClient } from '@/app/apps/type-client/type-client.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Client } from '@/app/apps/client/client.types';
import { TypeClientService } from '@/app/apps/type-client/type-client.service';

@Component({
    selector: 'app-add-client',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddClient implements OnInit {
    private clientService = inject(ClientService);
    private typeClientService = inject(TypeClientService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);
    loadingTypesClient = signal(false);
    typesClient: TypeClient[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            denomination: ['', Validators.required],
            sigle: ['', Validators.required],
            domaineActivite: ['', Validators.required],
            nomResponsable: ['', Validators.required],
            prenomResponsable: ['', Validators.required],
            emailResponsable: ['', [Validators.required, Validators.email]],
            telephoneResponsable: ['', Validators.required],
            adresse: ['', Validators.required],
            idTypeClient: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadTypesClient();
    }

    loadTypesClient() {
        this.loadingTypesClient.set(true);
        this.typeClientService
            .getTypesClient()
            .pipe(finalize(() => this.loadingTypesClient.set(false)))
            .subscribe({
                next: (response: ApiResponse<TypeClient[]>) => {
                    this.typesClient = response.data;
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

        const idTypeClient = this.form.get('idTypeClient')?.value;
        const formValue = { ...this.form.value };
        delete formValue.idTypeClient; // Exclude it from the body payload as it's sent via param

        this.clientService
            .addClient(idTypeClient, formValue)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/client']);
                },
                error: (err) => {
                    console.log(err);

                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
