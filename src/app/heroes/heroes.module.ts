import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { HeroAvatarPipe } from './pipes/actors-image.pipe';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroCardComponent,

    //Pipes
    HeroAvatarPipe,
    HeroImagePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule,
  ]
})
export class HeroesModule { }
