import { MatCardModule } from '@angular/material/card'
import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
  ]
}) export class MatModules {}
