import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [ `.chip-container {
    max-width: 200px; /* Ajusta este valor según tus necesidades */
  }

  mat-chip {
    overflow: hidden;
    text-overflow: ellipsis;

  }` ]
})
export class HeroCardComponent implements OnInit{


  @Input()
  public hero!: Hero;

  constructor() {}
  ngOnInit(): void {
    if (!this.hero) throw Error('Hero property is required');
  }
}
