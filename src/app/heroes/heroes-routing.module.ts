import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero', component: NewPageComponent , data: {rutaActivaTitle: 'nuevo heroe'} },
      { path: 'search', component: SearchPageComponent, data: {rutaActivaTitle: 'Buscar Héroes'} },
      { path: 'edit/:id', component: NewPageComponent, data: {rutaActivaTitle: 'Editar Héroes'} },
      { path: 'list', component: ListPageComponent, data: {rutaActivaTitle: 'Listado de Héroes'} },
      { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
