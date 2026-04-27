import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { RegionService } from '@/app/apps/region/region.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';


@Component({
    selector: 'app-add-region',
    imports: [Button, InputText, Textarea, ConfirmDialogModule, ReactiveFormsModule, Skeleton],
    templateUrl: './add.html',
    styleUrl: './add.scss',
    providers: [ConfirmationService]
})
export class AddRegion {
    private regionService = inject(RegionService);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private fb: FormBuilder = inject(FormBuilder);
    private router: Router = inject(Router);

    isLoading = signal(false);

    form: FormGroup;

    constructor() {
        this.form = this.fb.group({
            region: ['', Validators.required]
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

        this.regionService
            .addRegion(this.form.value)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.messageService.add({ severity: 'success', summary: 'Message', detail: 'Enregistrement effectué avec succès' });
                    this.router.navigate(['/ogp/region']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Message', detail: err.statusText });
                }
            });
    }
}
