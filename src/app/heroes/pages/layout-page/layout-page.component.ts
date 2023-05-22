import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public titleSeccion: string = '';

  constructor (
    private activastedRouter: ActivatedRoute,
    private router: Router,) {}

  ngOnInit(): void {
    this.router.events.subscribe(()=>{
      this.activastedRouter.children[0].data.subscribe((dataRouter) => {
        this.titleSeccion = dataRouter["rutaActivaTitle"];
      })
    })
  }

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]

}
