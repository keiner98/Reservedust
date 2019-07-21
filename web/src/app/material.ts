import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
} from "@angular/material";
import { NgModule } from "@angular/core";

const modules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
];
@NgModule({
  imports: modules,
  exports: modules,
})
export class Material {}
