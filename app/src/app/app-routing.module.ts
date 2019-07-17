import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'sugerencias', loadChildren: './sugerencias/sugerencias.module#SugerenciasPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'reservas', loadChildren: './reservas/reservas.module#ReservasPageModule' },
  { path: 'conoces', loadChildren: './conoces/conoces.module#ConocesPageModule' },
  { path: 'terminos', loadChildren: './terminos/terminos.module#TerminosPageModule' },
  { path: 'hreserva/:id', loadChildren: './hreserva/hreserva.module#HreservaPageModule' },
  { path: 'galeria', loadChildren: './galeria/galeria.module#GaleriaPageModule' },
  { path: 'imagen-modal', loadChildren: './imagen-modal/imagen-modal.module#ImagenModalPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
