import { CandidatesService } from './../../services/candidates.service'
import { Observable, Timestamp, startWith, map, combineLatest } from 'rxjs'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Candidate } from '../../models/candidate.model'
import { FormControl, FormBuilder } from '@angular/forms'
import { CandidateSearchType } from '../../enums/candidate-search-type.enum'
import { KeyValuePipe } from '@angular/common'

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.pug',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  public loading$!: Observable<boolean>
  public candidates$!: Observable<Array<Candidate>>

  public searchCtl!: FormControl
  public searchTypeCtl!: FormControl
  public searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[]

  constructor(private candidatesService: CandidatesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit()
    this.initObservables()
    this.candidatesService.getCandidatesFromServer()
  }

  private formInit() {
    this.searchCtl = this.fb.control('')
    this.searchTypeCtl = this.fb.control(CandidateSearchType.LASTNAME)
    this.searchTypeOptions = [
      { value: CandidateSearchType.FIRSTNAME, label: 'trier par Prénom' },
      { value: CandidateSearchType.LASTNAME, label: 'trier par Nom' },
      { value: CandidateSearchType.COMPANY, label: 'trier par Entreprise' }
    ]
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$
    const search$: Observable<string> = this.searchCtl.valueChanges.pipe(
      startWith(this.searchCtl.value),
      map(value => value.toLowerCase())
    )
    const searchTypeCtl$: Observable<CandidateSearchType> = this.searchTypeCtl.valueChanges.pipe(
      startWith(this.searchTypeCtl.value)
    )
    this.candidates$ = combineLatest([
      search$,
      searchTypeCtl$,
      this.candidatesService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search)))
    )
  }

}
