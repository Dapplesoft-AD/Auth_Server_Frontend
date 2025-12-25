import { EnvironmentConfig } from '../libs/core/environment-config.model'

export const environment: EnvironmentConfig = {
    BaseUrl: 'http://localhost:4200',
    appName: 'Auth-server',
    production: false,
    apiUrl: 'https://authapi.dapplesoft.com/api',
    authApiUrl: 'https://authapi.dapplesoft.com/auth',
}

// export const environment: EnvironmentConfig = {
//     BaseUrl: 'http://localhost:4200',
//     appName: 'Auth-server',
//     production: false,
//     apiUrl: 'http://localhost:5000',
//     authApiUrl: 'http://localhost:5000/auth',
// }
