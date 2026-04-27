import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { TypeClientService } from '@/app/apps/type-client/type-client.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { TypeClient } from '@/app/apps/type-client/type-client.types';
import { Skeleton } from 'primeng/skeleton';


@Component({
    selector: 'app-edit-type-client',
    imports: [Button, InputText, Textarea, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditTypeClient implements OnInit {
    private typeClientService = inject(TypeClientService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);

    form: FormGroup;
    idTypeClient: string | null = null;

    constructor() {
        this.form = this.fb.group({
            typeClient: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idTypeClient = params.get('id');
            if (this.idTypeClient) {
                this.loadTypeClient(this.idTypeClient);
            }
        });
    }

    loadTypeClient(id: string): void {
        this.isLoading.set(true);
        this.typeClientService
            .getTypeClient(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        typeClient: data.data.typeClient,
                        description: data.data.description
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
        if (!this.idTypeClient) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const updateData = { ...this.form.value, id: this.idTypeClient };

        this.typeClientService
            .updateTypeClient(updateData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/type-client']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
