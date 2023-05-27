import { Component } from '@angular/core';

@Component({
  selector: 'auth-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  `.grid {
      display: flex;
      justify-content: center; /* Centra horizontalmente el contenido */
      align-items: center; /* Centra verticalmente el contenido */
      height: 100vh; /* Opcional: establece la altura del contenedor según tus necesidades */

    }

  `
  ]
})
export class LayoutPageComponent {

}
