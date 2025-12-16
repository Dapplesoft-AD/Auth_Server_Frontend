import { Injectable } from '@angular/core'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { Region, RegionDto } from './regions.model'

@Injectable({
    providedIn: 'root',
})
export class RegionFormService {
    form: FormGroup

    constructor(private fb: NonNullableFormBuilder) {
        this.form = this.buildForm()
    }

    private buildForm(): FormGroup {
        const { required, minLength } = Validators

        return this.fb.group({
            countryId: ['', [required, minLength(3)]],
            name: ['', [required, minLength(3)]],
            regionType: ['', [required, minLength(3)]],
            isActive: [true, [required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue(): RegionDto {
        return this.form.getRawValue()
    }

    patchForm(region: Region) {
        this.form.patchValue({
            countryId: region.countryId,
            name: region.name,
            regionType: region.regionType,
            isActive: region.isActive,
        })
    }

    resetForm() {
        this.form.reset({
            countryId: '',
            name: '',
            regionType: '',
            isActive: true,
        })
    }
}
