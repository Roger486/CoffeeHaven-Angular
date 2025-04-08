// app/app.routes.ts

import { Routes } from '@angular/router';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { CoffeeDetailComponent } from './components/coffee-detail/coffee-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddCoffeeComponent } from './components/add-coffee/add-coffee.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const routes: Routes = [
    {
        path: '',
        component: MainContainerComponent,
        children: [
            { path: 'menu', component: MenuComponent },
            { path: 'new-order', component: NewOrderComponent, canActivate: [authGuard] },
            { path: 'menu/:id', component: CoffeeDetailComponent },
            { path: 'add-coffee', component: AddCoffeeComponent },
            { path: 'home', component: HomeComponent},
            { path: 'access-denied', component: AccessDeniedComponent},
            { path: '', redirectTo: '/home', pathMatch: 'full' } // To redirect to home the '/' url
        ]
    },
    { path: '**', redirectTo: '/home' } // for not found urls
];
