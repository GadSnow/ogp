import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { CommuneService } from '@/app/apps/commune/commune.service';
import { RegionService } from '@/app/apps/region/region.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { Region } from '@/app/apps/region/region.types';
import { ApiResponse } from '@/app/core/models/api-response.interface';


@Component({
    selector: 'app-add-commune',
    imports: [Button, InputText, Select, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss'
})
export class AddCommune implements OnInit {
    private communeService = inject(CommuneService);
    private regionService = inject(RegionService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);
    regions: Region[] = [];

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            commune: ['', Validators.required],
            idRegion: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadRegions();
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

        const idRegion = this.form.get('idRegion')?.value;
        const communeData = { commune: this.form.get('commune')?.value };

        this.communeService
            .addCommune(idRegion, communeData)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/commune']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
