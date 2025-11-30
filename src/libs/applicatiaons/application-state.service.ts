import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Application } from './application.model'

@Injectable({
    providedIn: 'root',
})
export class ApplicationStateService {
    private applicationsSubject = new BehaviorSubject<Application[]>([])
    applications$ = this.applicationsSubject.asObservable()

    setApplications(apps: Application[]) {
        this.applicationsSubject.next(apps)
    }

    addApplication(app: Application) {
        const current = this.applicationsSubject.value
        this.applicationsSubject.next([...current, app])
    }

    updateApplication(updated: Application) {
        const current = this.applicationsSubject.value.map((app) =>
            app.id === updated.id ? updated : app,
        )
        this.applicationsSubject.next(current)
    }

    deleteApplication(id: bigint) {
        const current = this.applicationsSubject.value.filter(
            (app) => app.id !== id,
        )
        this.applicationsSubject.next(current)
    }
}
