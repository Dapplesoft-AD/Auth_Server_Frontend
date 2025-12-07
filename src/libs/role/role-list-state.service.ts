// import { Injectable, inject } from '@angular/core'
// import {
//     catchError,
//     combineLatest,
//     debounceTime,
//     distinctUntilChanged,
//     finalize,
//     switchMap,
//     tap,
//     throwError,
// } from 'rxjs'
// import { SimpleStore } from '../store'
// import { Role } from './role.model'
// import { RoleApiService } from './role-api.service'

// export interface RoleState {
//     roles: Role[]
//     loading: boolean
//     error: boolean
//     selectedId?: string
//     search?: string
//     page?: number
//     size?: number
// }

// const initialRoleState: RoleState = {
//     roles: [],
//     loading: false,
//     error: false,
//     search: '',
//     page: 1,
//     size: 10,
// }

// @Injectable()
// export class RoleListStateService extends SimpleStore<RoleState> {
//     private roleApiService = inject(RoleApiService)

//     constructor() {
//         super(initialRoleState)
//     }

//     init() {
//         this.loadRoles()
//     }

//     private loadRoles() {
//         combineLatest([
//             this.select('search'),
//             this.select('selectedId'),
//             this.select('page'),
//             this.select('size'),
//         ])
//             .pipe(
//                 debounceTime(300),
//                 distinctUntilChanged(),
//                 tap(() => this.setState({ loading: true })),
//                 switchMap(([search, selectedId, page, size]) => {
//                     return this.roleApiService.findAllRoles({
//                         search,
//                         selectedId,
//                         page,
//                         size,
//                     })
//                 }),
//             )
//             .subscribe({
//                 next: (roles) => this.setState({ roles, loading: false }),
//                 error: () => this.setState({ loading: false, error: true }),
//             })
//     }
// }
