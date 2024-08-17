import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuardService } from "./services/auth.guard/auth.guard.service";
import { NgModule } from "@angular/core";
import { FormAddClientComponent } from "./components/private/form-add-client/form-add-client.component";
import { ClientsListComponent } from "./components/private/clients-list/clients-list.component";
import { UpdateClientByIdComponent } from "./components/private/update-client-by-id/update-client-by-id.component";
import { GetReformsByClientIdComponent } from "./components/private/get-reforms-by-client-id/get-reforms-by-client-id.component";
import { AddReformToClientComponent } from "./components/private/add-reform-to-client/add-reform-to-client.component";
import { InfoReformComponent } from "./components/private/info-reform/info-reform.component";
import { UpdateUserComponent } from "./components/private/update-user/update-user.component";
import { UpdatePasswordToUserComponent } from "./components/private/update-password-to-user/update-password-to-user.component";
import { UpdateReformComponent } from "./components/private/update-reform/update-reform.component";

export const privateRoutes: Routes = [
    {path: "add-client", component: FormAddClientComponent, canActivate: [AuthGuardService]},
    {path: "clients", component: ClientsListComponent, canActivate: [AuthGuardService]},
    {path: "update-client/:clientId", component: UpdateClientByIdComponent, canActivate: [AuthGuardService]},
    {path: "reforms-client/:clientId", component: GetReformsByClientIdComponent, canActivate: [AuthGuardService]},
    {path: "reforms-client/:clientId/:reformId", component: InfoReformComponent, canActivate: [AuthGuardService]},
    {path: "add-reform", component:AddReformToClientComponent, canActivate: [AuthGuardService]},
    {path: "update-password", component:UpdatePasswordToUserComponent, canActivate: [AuthGuardService]},
    {path: "update-user", component: UpdateUserComponent, canActivate: [AuthGuardService]},
    {path: "update-reform/:reformId", component:UpdateReformComponent, canActivate: [AuthGuardService]},
    {path: "**", component: ClientsListComponent, canActivate: [AuthGuardService]},
]