import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'actorsImage'
})
export class ActorsImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if ( !hero.id && !hero.alt_img) {
      return 'assets/no-image.png'
    }

    if ( hero.alt_img ) return hero.alt_img;

    return `assets/actors/${ hero.id }.jpg`
  }

}
