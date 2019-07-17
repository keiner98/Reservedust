import { MatButtonModule,MatCardModule,MatInputModule } from "@angular/material";
import { NgModule } from '@angular/core';

const modules = [
  MatButtonModule,
  MatCardModule,
  MatInputModule
]
@NgModule({
  imports: modules,
  exports: modules
})
export class Material{}
