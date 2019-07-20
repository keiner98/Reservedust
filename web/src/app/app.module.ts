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
import { testComponent, BottomSheetOverviewExampleSheet } from "./components/test/test.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegistroComponent, mapComponent } from './components/admin/registro/registro.component';

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  { path: "login/admin", component: AdminLoginComponent },
  { path: "", component: AdminComponent },
  { path: "test", component: testComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    testComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminNavComponent,
    RegistroComponent,
    mapComponent,
    BottomSheetOverviewExampleSheet
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  entryComponents: [BottomSheetOverviewExampleSheet, mapComponent] ,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
