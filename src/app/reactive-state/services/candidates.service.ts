import { environment } from './../../../environments/environment'
import { delay, filter, map, Observable, tap, switchMap, take } from 'rxjs'
import { HttpClient, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Candidate } from '../models/candidate.model'
import { Router } from '@angular/router'

@Injectable()
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false)
  private _candidates$ = new BehaviorSubject<Candidate[]>([])
  private lastLoading = 0

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable()
  }
  public get candidates$(): Observable<Array<Candidate>> {
    return this._candidates$.asObservable()
  }
  private setLoading(value: boolean): void {
    this._loading$.next(value)
  }
  private setCandidates(value: Candidate[]): void {
    this._candidates$.next(value)
  }

  public getCandidatesFromServer() {
    if (Date.now() - this.lastLoading <= 300000) {
      console.log('no reload from server required!')
      return
    }
    this.setLoading(true)
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(1000),
      tap(value => {
        this.lastLoading = Date.now()
        this.setCandidates(value)
        this.setLoading(false)
      })
    ).subscribe()
  }

  public getSingleCandidate(id: number): Observable<Candidate> {
    if (!this.lastLoading) {
      this.getCandidatesFromServer()
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(c => c.id === id)[0])
    )
  }

  refuseCandidate(id: number) {
    this.setLoading(true)
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(c => c.id !== id)),
      tap(candidates => {
        this.setCandidates(candidates)
        this.setLoading(false)
      })
    ).subscribe()
  }

  hireCandidate(id: number) {
    this.setLoading(true)
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates
        .map(c => c.id === id
          ? { ...c, company: 'snapFace Ltd' }
          : c
        )),
      tap(updCandidates => this._candidates$.next(updCandidates)),
      switchMap(updCandidates => this.http.patch(`${environment.apiUrl}/candidates/${id}`, updCandidates.find(c => c.id === id))),
      tap(() => this.setLoading(false))
    ).subscribe()
  }

  constructor(private http: HttpClient) { }

}
