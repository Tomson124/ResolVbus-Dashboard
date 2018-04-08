import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,

      MatToolbarModule,
      MatSidenavModule
    ],
    exports: [
      CommonModule,
      FormsModule,

      MatToolbarModule,
      MatSidenavModule
    ]
  })
  export class SharedModule { }
