import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
  ]
}) export class MaterialModules {}
