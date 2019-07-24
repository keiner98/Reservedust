import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { Material } from "./material";
import { Route, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SatPopoverModule } from "@ncstate/sat-popover";

// Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { testComponent } from "./components/test/test.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminNavComponent } from "./components/admin/admin-nav/admin-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { RegistroComponent } from "./components/admin/registro/registro.component";
import { MapComponent } from "./components/admin/map/map.component";
import { HomeComponent } from "./components/admin/home/home.component";
import { MotelTableComponent } from "./components/admin/home/motel-table/motel-table.component";
import { MotelFormComponent } from "./components/admin/home/motel-form/motel-form.component";
import { InlineEditComponent } from './components/admin/home/inline-edit/inline-edit.component';

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
    MotelTableComponent,
    MotelFormComponent,
    InlineEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SatPopoverModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [MapComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
