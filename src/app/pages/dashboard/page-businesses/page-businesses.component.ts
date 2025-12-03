import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { PaginatorModule } from 'primeng/paginator'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { BusinessApiService } from '../../../../libs/businesses/business-api.service'
import { Business } from '../../../../libs/businesses/businesses.model'

@Component({
    selector: 'app-page-businesses',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ConfirmDialogModule,
        TableModule,
        PaginatorModule,
        ToastModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
    ],
    templateUrl: './page-businesses.component.html',
    styleUrls: ['./page-businesses.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class PageBusinessesComponent implements OnInit {
    businesses: Business[] = []
    dialogVisible = false
    editingBusiness: Business = {} as Business
    isAddMode = false

    constructor(
        private businessService: BusinessApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.loadBusinesses()
    }

    loadBusinesses() {
        this.businessService.getBusinesses().subscribe({
            next: (data) => {
                this.businesses = data
            },
        })
    }

    openAddDialog() {
        this.editingBusiness = {
            id: 0,
            owner_user: '',
            business_name: '',
            industry_type: '',
            status: 'active',
            created_at: '',
        }
        this.isAddMode = true
        this.dialogVisible = true
    }

    openEditDialog(business: Business) {
        this.editingBusiness = { ...business }
        this.isAddMode = false
        this.dialogVisible = true
    }

    saveBusiness() {
        if (this.isAddMode) {
            this.businessService
                .createBusiness(this.editingBusiness)
                .subscribe(() => {
                    this.loadBusinesses()
                    this.dialogVisible = false
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Added',
                        detail: 'Business added successfully',
                    })
                })
        } else {
            this.businessService
                .updateBusiness(this.editingBusiness.id, this.editingBusiness)
                .subscribe(() => {
                    this.loadBusinesses()
                    this.dialogVisible = false
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'Business updated successfully',
                    })
                })
        }
    }

    deleteBusiness(business: Business) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${business.business_name}?`,
            accept: () => {
                this.businessService
                    .deleteBusiness(business.id)
                    .subscribe(() => {
                        this.loadBusinesses()
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Deleted',
                            detail: 'Business deleted successfully',
                        })
                    })
            },
        })
    }
}
