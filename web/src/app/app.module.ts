import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Material } from "./material";
import { Route, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test.component";
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "login/admin", component: AdminLoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "test", component: TestComponent }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, TestComponent, AdminComponent, AdminLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
