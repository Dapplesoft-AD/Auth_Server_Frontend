import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { Application } from '../../../../libs/applicatiaons/application.model'
import { ApplicationDataService } from '../../../../libs/applicatiaons/application-data.service'

@Component({
    selector: 'app-page-applications',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
    ],
    templateUrl: './page-applications.component.html',
    providers: [MessageService],
})
export class PageApplicationsComponent implements OnInit {
    applications: Application[] = []
    projectForm: FormGroup
    showForm = false
    editingIndex: number | null = null

    statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]

    constructor(
        private fb: FormBuilder,
        private appService: ApplicationDataService,
        private messageService: MessageService,
    ) {
        this.projectForm = this.fb.group({
            name: [''],
            client_id: [''],
            client_secret: [''],
            redirect_uri: [''],
            api_base_url: [''],
            status: ['active'],
        })
    }

    ngOnInit(): void {
        this.loadApplications()
    }

    loadApplications() {
        this.appService.getAll().subscribe({
            next: (data) => {
                this.applications = data
            },
        })
    }

    openForm(index: number | null = null) {
        this.editingIndex = index
        if (index !== null)
            this.projectForm.patchValue(this.applications[index])
        else this.projectForm.reset({ status: 'active' })
        this.showForm = true
    }

    closeForm() {
        this.showForm = false
        this.editingIndex = null
    }

    saveProject() {
        const data = this.projectForm.value
        if (this.editingIndex !== null) {
            const id = this.applications[this.editingIndex].id
            this.appService.update(id, data).subscribe((updated) => {
                if (updated) {
                    this.applications[this.editingIndex!] = updated
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: `Project "${updated.name}" updated`,
                    })
                }
            })
        } else {
            const newApp: Application = {
                ...data,
                id: BigInt(
                    this.applications.length
                        ? Math.max(
                              ...this.applications.map((a) => Number(a.id)),
                          ) + 1
                        : 1,
                ),
            }
            this.appService.create(newApp).subscribe((created) => {
                this.applications.push(created)
                this.messageService.add({
                    severity: 'success',
                    summary: 'Added',
                    detail: `Project "${created.name}" added`,
                })
            })
        }
        this.closeForm()
    }

    deleteProject(index: number) {
        const app = this.applications[index]
        if (confirm(`Are you sure you want to delete project "${app.name}"?`)) {
            this.appService.delete(app.id).subscribe((success) => {
                if (success) {
                    this.applications.splice(index, 1)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted',
                        detail: `Project "${app.name}" deleted`,
                    })
                }
            })
        }
    }
}
