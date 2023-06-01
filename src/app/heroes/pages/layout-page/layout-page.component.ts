import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
@UntilDestroy()
export class LayoutPageComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public titleSeccion: string = '';

  constructor(
    private observer: BreakpointObserver,
    private activastedRouter: ActivatedRoute,
    private authService: AuthService,
    private router: Router,) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1500px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
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

  get user():User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }


}
