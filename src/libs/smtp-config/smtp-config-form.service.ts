import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { SmtpConfig, SmtpConfigDto } from './smtp-config.model'

@Injectable({
    providedIn: 'root',
})
export class SmtpConfigFormService {
    form: FormGroup
    private currentId?: string

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    private buildForm(): FormGroup {
        const { required, email, min, max } = Validators
        return this.fb.group({
            host: ['smtp.gmail.com', [required]],
            port: [587, [required, min(1), max(65535)]],
            username: ['', [required, email]],
            password: ['', [required, Validators.minLength(6)]],
            senderEmail: ['', [required, email]],
            enableSsl: [true],
        })
    }

    getValue(): SmtpConfigDto {
        return this.form.getRawValue()
    }

    patchForm(config: any) {
        // Changed to 'any' to handle different data structures
        // Handle both 'id' and 'smtpId' from backend
        this.currentId = config.id || config.smtpId

        // Patch the form with config data (excluding id fields)
        const formData = { ...config }
        delete formData.id
        delete formData.smtpId

        this.form.patchValue(formData)
    }

    reset() {
        this.currentId = undefined
        this.form.reset({
            host: 'smtp.gmail.com',
            port: 587,
            username: '',
            password: '',
            senderEmail: '',
            enableSsl: true,
        })
    }

    getCurrentId(): string | undefined {
        return this.currentId
    }

    controls(control: string) {
        return this.form.get(control)
    }
}
