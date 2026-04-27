import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ClientService } from '@/app/apps/client/client.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { TypeClient } from '@/app/apps/type-client/type-client.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Client } from '@/app/apps/client/client.types';
import { TypeClientService } from '@/app/apps/type-client/type-client.service';

@Component({
    selector: 'app-edit-client',
    imports: [Button, InputText, Select, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditClient implements OnInit {
    private clientService = inject(ClientService);
    private typeClientService = inject(TypeClientService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);
    loadingTypesClient = signal(false);
    typesClient: TypeClient[] = [];

    form: FormGroup;
    idClient: string | null = null;

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

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idClient = params.get('id');
            if (this.idClient) {
                this.loadTypesClient();
                this.loadClient(this.idClient);
            }
        });
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

    loadClient(id: string): void {
        this.isLoading.set(true);
        this.clientService
            .getClient(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        denomination: data.data.denomination,
                        sigle: data.data.sigle,
                        domaineActivite: data.data.domaineActivite,
                        nomResponsable: data.data.nomResponsable,
                        prenomResponsable: data.data.prenomResponsable,
                        emailResponsable: data.data.emailResponsable,
                        telephoneResponsable: data.data.telephoneResponsable,
                        adresse: data.data.adresse,
                        idTypeClient: data.data.typeClient.id
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
        if (!this.idClient) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const idTypeClient = this.form.get('idTypeClient')?.value;
        const formValue = { ...this.form.value };
        delete formValue.idTypeClient;

        formValue.id = this.idClient; // Insert ID into payload just in case backend expects it on PUT

        this.clientService
            .updateClient(idTypeClient, formValue)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/client']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
