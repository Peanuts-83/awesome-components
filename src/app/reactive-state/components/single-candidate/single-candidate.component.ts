import { ActivatedRoute, Params, Router } from '@angular/router'
import { CandidatesService } from './../../services/candidates.service'
import { Observable, switchMap, take, tap } from 'rxjs'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Candidate } from '../../models/candidate.model'

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.pug',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {
  public loading$!: Observable<boolean>
  public candidate$!: Observable<Candidate>

  constructor(private candidatesService: CandidatesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loading$ = this.candidatesService.loading$
    this.candidate$ = this.route.params.pipe(
      switchMap((params: Params) => this.candidatesService.getSingleCandidate(+params['id']))
    )
  }


  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.hireCandidate(candidate.id)
        this.onGoBack()
      })
    ).subscribe()
  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.refuseCandidate(candidate.id)
        this.onGoBack()
      })
    ).subscribe()

  }

  onGoBack() {
    this.router.navigateByUrl('reactive-state/candidates')
  }



}
