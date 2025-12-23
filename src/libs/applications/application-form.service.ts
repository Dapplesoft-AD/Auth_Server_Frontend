import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Application, ApplicationDto } from './application.model'

@Injectable({
    providedIn: 'root',
})
export class ApplicationFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    buildForm(): FormGroup {
        const { required, minLength, pattern } = Validators

        return this.fb.group({
            displayName: [
                '',
                [required, minLength(3), pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)],
            ],
            clientId: ['', [required, minLength(6), pattern(/^[A-Za-z0-9]*$/)]],
            clientSecret: [
                '',
                [required, minLength(10), pattern(/^[\x21-\x7E]+$/)],
            ],
            redirectUris: ['', [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): ApplicationDto & {
        displayName: string
        clientId: string
        clientSecret: string
        redirectUris: string
    } {
        return this.form.getRawValue()
    }

    patchForm(application: Application) {
        this.form.patchValue({
            displayName: application.displayName,
            clientId: application.clientId,
            clientSecret: application.clientSecret,
            redirectUri: application.redirectUris,
        })
    }

    resetForm() {
        this.form.reset({
            name: '',
            clientId: '',
            clientSecret: '',
            redirectUri: [],
        })
    }
}
