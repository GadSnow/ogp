import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { RemiseService } from '@/app/apps/remise/remise.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Remise } from '@/app/apps/remise/remise.types';
import { Skeleton } from 'primeng/skeleton';


@Component({
    selector: 'app-edit-remise',
    imports: [Button, InputText, Textarea, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss',
    providers: [ConfirmationService]
})
export class EditRemise implements OnInit {
    private remiseService = inject(RemiseService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);

    form: FormGroup;
    idRemise: string | null = null;

    constructor() {
        this.form = this.fb.group({
            typeRemise: ['', Validators.required],
            valeurRemise: ['', [Validators.required, Validators.min(0)]]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idRemise = params.get('id');
            if (this.idRemise) {
                this.loadRemise(this.idRemise);
            }
        });
    }

    loadRemise(id: string): void {
        this.isLoading.set(true);
        this.remiseService
            .getRemise(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        typeRemise: data.data.typeRemise,
                        valeurRemise: data.data.valeurRemise
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
        if (!this.idRemise) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const updateData = { ...this.form.value, id: this.idRemise };

        this.remiseService
            .updateRemise(updateData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/remise']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
