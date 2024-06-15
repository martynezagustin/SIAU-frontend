import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuardService } from "./services/auth.guard/auth.guard.service";
import { NgModule } from "@angular/core";
import { FormAddClientComponent } from "./components/private/form-add-client/form-add-client.component";
import { ClientsListComponent } from "./components/private/clients-list/clients-list.component";

export const privateRoutes: Routes = [
    {path: "add-client", component: FormAddClientComponent, canActivate: [AuthGuardService]},
    {path: "clients", component: ClientsListComponent, canActivate: [AuthGuardService]},
    {path: "**", component: ClientsListComponent, canActivate: [AuthGuardService]}
]