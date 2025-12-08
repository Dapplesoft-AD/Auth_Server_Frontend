import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag'
import { MfaSetting } from '../../../../libs/mfsettings/mfasetting.model'
import { MfaSettingDataService } from '../../../../libs/mfsettings/mfasetting-data.service'

@Component({
    selector: 'app-page-mfaSettings',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule],
    templateUrl: './page-mfaSettings.component.html',
    styleUrls: ['./page-mfaSettings.component.css'],
})
export class PageMfaSettingsComponent implements OnInit {
    mfaSettings: MfaSetting[] = []

    constructor(private mfaService: MfaSettingDataService) {}

    ngOnInit(): void {
        this.mfaService.getAll().subscribe((data) => {
            this.mfaSettings = data
        })
    }

    toggleEnabled(setting: MfaSetting) {
        this.mfaService.toggleEnabled(setting.user_name)
    }
}
