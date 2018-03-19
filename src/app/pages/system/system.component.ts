import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'ngx-system',
    templateUrl: './system.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class SystemComponent {
  }
