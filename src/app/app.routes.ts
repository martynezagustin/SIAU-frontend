import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Router } from 'express';
import { LoginFirstComponent } from './components/login-first/login-first.component';
import { AuthGuardService } from './services/auth.guard/auth.guard.service';
import { privateRoutes } from './private.routes';

export const routes: Routes = [
    {path: "dashboard/:userId", component: DashboardComponent, canActivate: [AuthGuardService], children: privateRoutes},
    {path: "**", component: LoginFirstComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
