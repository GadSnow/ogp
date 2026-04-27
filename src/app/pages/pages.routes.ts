import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Invoice } from './invoice/invoice';
import { AboutUs } from './aboutus/aboutus';
import { Help } from './help/help';
import { ContactUs } from './contactus/contactus';
import { Faq } from './faq/faq';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud, data: { breadcrumb: 'Crud' } },
    { path: 'empty', component: Empty },
    { path: 'invoice', component: Invoice, data: { breadcrumb: 'Invoice' } },
    { path: 'aboutus', component: AboutUs },
    { path: 'help', component: Help, data: { breadcrumb: 'Help' } },
    { path: 'faq', component: Faq, data: { breadcrumb: 'FAQ' } },
    { path: 'contact', component: ContactUs },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
