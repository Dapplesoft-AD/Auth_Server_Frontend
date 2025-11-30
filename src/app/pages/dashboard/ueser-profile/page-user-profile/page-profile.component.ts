import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'

@Component({
    selector: 'app-page-profile',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
    ],
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.css'],
})
export class PageProfileComponent {
    userProfile = {
        user_id: 'Mohammad Arman',
        email: 'arman@example.com',
        profile_image_url: 'https://via.placeholder.com/150',
        address: '123 Street Name',
        city: 'Dhaka',
        country: 'Bangladesh',
        postal_code: '1200',
        date_of_birth: new Date(1995, 4, 15),
    }

    showProfileModal = false
    profileForm: FormGroup

    constructor(private fb: FormBuilder) {
        this.profileForm = this.fb.group({
            address: [this.userProfile.address],
            city: [this.userProfile.city],
            country: [this.userProfile.country],
            postal_code: [this.userProfile.postal_code],
        })
    }

    openProfileModal() {
        this.profileForm.patchValue({
            address: this.userProfile.address,
            city: this.userProfile.city,
            country: this.userProfile.country,
            postal_code: this.userProfile.postal_code,
        })
        this.showProfileModal = true
    }

    closeProfileModal() {
        this.showProfileModal = false
    }

    saveProfile() {
        if (this.profileForm.valid) {
            this.userProfile = {
                ...this.userProfile,
                ...this.profileForm.value,
            }
            console.log('Updated Profile:', this.userProfile)
            this.closeProfileModal()
        }
    }
}
