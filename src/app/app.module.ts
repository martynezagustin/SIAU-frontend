import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LoginFirstComponent } from "./components/login-first/login-first.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ClientsListComponent } from "./components/private/clients-list/clients-list.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginFirstComponent,
        FooterComponent,
        ClientsListComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}