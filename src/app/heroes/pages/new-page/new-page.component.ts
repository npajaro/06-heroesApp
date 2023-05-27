import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [`
  .image-container {
    height: 500px; /* Establece la altura deseada para la imagen */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-image {
    max-width: 100%; /* Limita el ancho máximo de la imagen al ancho del contenedor */
    max-height: 100%; /* Limita la altura máxima de la imagen al alto del contenedor */
    object-fit: contain; /* Ajusta la imagen para que se ajuste dentro del contenedor */
    box-shadow: 0px 0px 10px;
    border-radius: 10px;
  }
  .container-title{
    display: flex;
    align-items: center;
  }
  .icon-container {
    display: flex;
    align-items: center;
    margin-right: 5px; /* Ajusta el margen derecho según tus necesidades */
  }
  mat-icon{
    margin-right: 5px;
  }
  `
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:                new FormControl(''),
    superhero:         new FormControl('', { nonNullable: true, }),
    publisher:         new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:         new FormControl(''),
    first_appearance:  new FormControl(''),
    characters:        new FormControl(''),
    alt_img:           new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ]

  constructor (
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes( 'edit' ) ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById (id) )
      ).subscribe( hero => {

        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero)
        return;
      });

  }

  onDeleteHero(): void {
    if ( !this.currentHero.id ) throw Error('Hero id is required')

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result === true ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ),
        filter( (wasDeleted: boolean) => wasDeleted === true ),
      )
    .subscribe(() => {
      this.router.navigate([ '/heroes/list' ]);
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result) return;

    //   this.heroesService.deleteHeroById( this.currentHero.id )
    //   .subscribe( wasDeleted => {
    //     if ( wasDeleted === true )
    //     this.router.navigate([ '/heroes/list' ]);
    //   })
    // });

  }


  onSubmit(): void{
    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero  =>{
         this.showSnackbar(`${hero.superhero} updated!`)
        });
      return
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar y navigar a /hero/edit/ hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackbar(`${hero.superhero} created!`)
      });

  }

  showSnackbar(message: string):void {
    this.snackbar.open( message, 'done', {
      duration: 2500
    });
  }

  openDialog( enterAnimationDuration: string, exitAnimationDuration: string  ):void{
    this.dialog
  }

}
