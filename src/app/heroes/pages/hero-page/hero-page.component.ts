import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [`
    .custom-card {max-width: 650px;}
    .custom-card2{flex: 1;}
    .grid {display: flex;}
    .custom-card img {box-shadow: 0px 0px 4px;}
    `
  ]
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.activateRouter.params
    .pipe(
      delay(800),
      switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
    ).subscribe( hero => {
      if ( !hero) return this.router.navigateByUrl('/heroes/list')
      this.hero = hero;
      return
    })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }
}
