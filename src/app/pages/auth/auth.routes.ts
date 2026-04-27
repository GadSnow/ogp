import { Routes } from '@angular/router';
import { AccessDenied } from './accessdenied';
import { Login } from './login';
import { Error } from './error';
import { Register } from './register';
import { ForgotPassword } from './forgotpassword';
import { NewPassword } from './newpassword';
import { Verification } from './verification';
import { LockScreen } from './lockscreen';
import { Oops } from './oops';

export default [
    { path: 'access-denied', component: AccessDenied },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgotpassword', component: ForgotPassword },
    { path: 'newpassword', component: NewPassword },
    { path: 'verification', component: Verification },
    { path: 'lockscreen', component: LockScreen },
    { path: 'oops', component: Oops }
] as Routes;
