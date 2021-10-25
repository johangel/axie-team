import { AxieDetail } from '../../models/axie-detail.model';
import { AxiesService } from '../../services/axies.service';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AxieTeamPositionEnum } from '../../constants/axie.constants';
import { AxieTeamPosition } from '../../models/axie-team.model';

@Component({
  selector: 'axie-fetcher',
  templateUrl: './axie-fetcher.component.html',
  styleUrls: ['./axie-fetcher.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AxieFetcherComponent {
  axie$!: Observable<AxieDetail> | null;
  errorMessage!: string | null;
  loading = false;
  @Input() position!: AxieTeamPositionEnum;
  @Output() emitAxie: EventEmitter<AxieTeamPosition> = new EventEmitter<AxieTeamPosition>();
  @Output() deleteAxie: EventEmitter<AxieTeamPositionEnum> =
    new EventEmitter<AxieTeamPositionEnum>();
  constructor(public axieService: AxiesService) {}

  fetchAxieData(axieId: string): void {
    this.loading = true;
    this.axie$ = this.axieService.getAxie(axieId).pipe(
      tap((axie) => {
        this.errorMessage = null;
        this.loading = false;
        this.emitAxie.emit({
          axie,
          position: AxieTeamPositionEnum[this.position],
        });
      }),
      catchError(() => {
        this.loading = false;
        this.errorMessage = 'error fetching axie';
        return EMPTY;
      })
    );
  }

  clear(): void {
    this.axie$ = null;
    this.deleteAxie.emit(AxieTeamPositionEnum[this.position]);
  }
}
