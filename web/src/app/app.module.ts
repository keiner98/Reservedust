import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Material } from "./material";
import { Route, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { testComponent } from "./components/test/test.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminNavComponent } from "./components/admin/admin-nav/admin-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RegistroComponent } from "./components/admin/registro/registro.component";
import { MapComponent } from "./components/admin/map/map.component";
import { HomeComponent } from "./components/admin/home/home.component";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "login/admin", component: AdminLoginComponent },
  { path: "", component: AdminComponent },
  {
    path: "admin",
    component: AdminNavComponent,
    children: [
      { path: "register", component: RegistroComponent },
      { path: "", component: HomeComponent },
    ],
  },
  { path: "test", component: testComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LoginComponent,
    testComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminNavComponent,
    RegistroComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: [MapComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}