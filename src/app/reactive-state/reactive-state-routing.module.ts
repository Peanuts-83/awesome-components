import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component'
import { CandidateListComponent } from './components/candidate-list/candidate-list.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidates/:id', component: SingleCandidateComponent },
  { path: '', redirectTo: 'candidates', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
