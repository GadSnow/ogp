import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { CategoriePanneauxService } from '@/app/apps/categorie-panneaux/categorie-panneaux.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { CategoriePanneaux } from '@/app/apps/categorie-panneaux/categorie-panneaux.types';
import { Skeleton } from 'primeng/skeleton';


@Component({
    selector: 'app-edit-categorie-panneaux',
    imports: [Button, InputText, Textarea, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditCategoriePanneaux implements OnInit {
    private categoriePanneauxService = inject(CategoriePanneauxService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);

    form: FormGroup;
    idCategoriePanneaux: string | null = null;

    constructor() {
        this.form = this.fb.group({
            categorie: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idCategoriePanneaux = params.get('id');
            if (this.idCategoriePanneaux) {
                this.loadCategoriePanneaux(this.idCategoriePanneaux);
            }
        });
    }

    loadCategoriePanneaux(id: string): void {
        this.isLoading.set(true);
        this.categoriePanneauxService
            .getCategoriePanneaux(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        categorie: data.data.categorie,
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
        if (!this.idCategoriePanneaux) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const updateData = { ...this.form.value, id: this.idCategoriePanneaux };

        this.categoriePanneauxService
            .updateCategoriePanneaux(updateData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/categorie-panneaux']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
