import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Erstellt von <b><a href="https://tomson124.de" target="_blank">Tomson124</a></b> 2018</span>
    <div class="socials">
      <a href="https://github.com/Tomson124" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/TomsonDesign/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/Tomson124" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class FooterComponent {
}
