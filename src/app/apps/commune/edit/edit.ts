import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CommuneService } from '@/app/apps/commune/commune.service';
import { RegionService } from '@/app/apps/region/region.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { Region } from '@/app/apps/region/region.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';


@Component({
    selector: 'app-edit-commune',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './edit.html',
    styleUrl: './edit.scss'
})
export class EditCommune implements OnInit {
    private communeService = inject(CommuneService);
    private regionService = inject(RegionService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    isLoading = signal(false);
    regions: Region[] = [];

    form: FormGroup;
    idCommune: string | null = null;

    constructor() {
        this.form = this.fb.group({
            commune: ['', Validators.required],
            idRegion: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.idCommune = params.get('id');
            if (this.idCommune) {
                this.loadRegions();
                this.loadCommune(this.idCommune);
            }
        });
    }

    loadRegions() {
        this.regionService
            .getRegions()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (response: ApiResponse<Region[]>) => {
                    this.regions = response.data;
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }

    loadCommune(id: string): void {
        this.isLoading.set(true);
        this.communeService
            .getCommune(id)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.form.patchValue({
                        commune: data.data.commune,
                        idRegion: data.data.region.id
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
        if (!this.idCommune) {
            this.messageService.add({ severity: 'error', summary: 'Message', detail: 'ID manquant' });
            return;
        }

        this.isLoading.set(true);

        const idRegion = this.form.get('idRegion')?.value;
        const communeData = { id: this.idCommune, commune: this.form.get('commune')?.value };

        this.communeService
            .updateCommune(idRegion, communeData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Modification effectuée avec succès' });
                    this.router.navigate(['/ogp/commune']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
