import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const password = form.get('password')?.value
        const confirmPassword = form.get('confirmPassword')?.value

        if (!password || !confirmPassword) return null

        if (password !== confirmPassword) {
            form.get('confirmPassword')?.setErrors({ passwordMismatch: true })
            return { passwordMismatch: true }
        }
        const cp = form.get('confirmPassword')
        if (cp?.hasError('passwordMismatch')) {
            cp.setErrors(null)
        }
        return null
    }
}
