import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Skeleton } from 'primeng/skeleton';
import { RegieService } from '@/app/apps/regie/regie.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-edit-regie',
    imports: [Button, InputText, Skeleton, ReactiveFormsModule],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditRegie implements OnInit {
    private regieService = inject(RegieService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);
    loadingData = signal(false);

    idRegie: string | null = null;

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            denomination: ['', Validators.required],
            sigle: [''],
            nomResponsable: ['', Validators.required],
            prenomResponsable: ['', Validators.required],
            emailResponsable: ['', Validators.email],
            telephoneResponsable: ['', Validators.required],
            adresse: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idRegie = params.get('id');
            if (this.idRegie) {
                this.loadRegie(this.idRegie);
            }
        });
    }

    loadRegie(id: string): void {
        this.loadingData.set(true);
        this.regieService
            .getRegie(id)
            .pipe(finalize(() => this.loadingData.set(false)))
            .subscribe({
                next: (data) => {
                    const regie = data.data;
                    this.form.patchValue({
                        denomination: regie.denomination,
                        sigle: regie.sigle,
                        nomResponsable: regie.nomResponsable,
                        prenomResponsable: regie.prenomResponsable,
                        emailResponsable: regie.emailResponsable,
                        telephoneResponsable: regie.telephoneResponsable,
                        adresse: regie.adresse
                    });
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || err.statusText || 'Erreur lors du chargement des données' });
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
        if (!this.idRegie) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const updateData = { ...this.form.value, id: this.idRegie };

        this.regieService
            .updateRegie(updateData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/regie']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error?.message || err.statusText || 'Erreur' });
                }
            });
    }
}
