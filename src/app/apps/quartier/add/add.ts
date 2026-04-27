import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { QuartierService } from '@/app/apps/quartier/quartier.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { Commune } from '@/app/apps/commune/commune.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';
import { Quartier } from '@/app/apps/quartier/quartier';
import { CommuneService } from '@/app/apps/commune/commune.service';


@Component({
    selector: 'app-add-quartier',
    imports: [Button, InputText, Select, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss',
    providers: [ConfirmationService]
})
export class AddQuartier implements OnInit {
    private quartierService = inject(QuartierService);
    private communeService = inject(CommuneService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);
    communes: Commune[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            quartier: ['', Validators.required],
            idCommune: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadCommunes();
    }

    loadCommunes() {
        this.communeService
            .getCommunes()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Commune[]>) => {
                    this.communes = response.data;
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

        const idCommune = this.form.get('idCommune')?.value;
        const quartierData = { quartier: this.form.get('quartier')?.value };

        this.quartierService
            .addQuartier(idCommune, quartierData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/quartier']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
