import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AxieTeam, AxieTeamPosition } from '../../models/axie-team.model';
import { AxieTeamPositionEnum } from '../../constants/axie.constants';

@Component({
  selector: 'axie-team',
  template: `<div class="team-header">
      <h1>team Name: {{ axieTeam.teamName || '' }}</h1>
      <mat-icon (click)="deleteTeam.emit(axieTeam.teamName)">clear</mat-icon>
    </div>
    <div class="axie-team">
      <axie-fetcher
        (emitAxie)="setAxie($event)"
        (deleteAxie)="deleteAxie($event)"
        [position]="positions.back"
      ></axie-fetcher>
      <axie-fetcher
        (emitAxie)="setAxie($event)"
        (deleteAxie)="deleteAxie($event)"
        [position]="positions.mid"
      ></axie-fetcher>
      <axie-fetcher
        (emitAxie)="setAxie($event)"
        (deleteAxie)="deleteAxie($event)"
        [position]="positions.front"
      ></axie-fetcher>
    </div>
    <div class="team-auction" *ngIf="axieTeam.auction">
      USD: {{ axieTeam.auction?.currentPriceUSD | currency }} <br />
      ETH: {{ axieTeam.auction?.currentPrice | ethereum }}
    </div>`,
  styleUrls: ['./axie-team.component.scss'],
})
export class AxieTeamComponent {
  @Input() axieTeam!: AxieTeam;
  @Output() deleteTeam: EventEmitter<string> = new EventEmitter<string>();

  positions = AxieTeamPositionEnum;

  setAxie(event: AxieTeamPosition) {
    this.axieTeam.team[event.position] = event.axie;
    this.calculateTotalTeamValue();
  }

  deleteAxie(position: AxieTeamPositionEnum) {
    this.axieTeam.team[position] = null;
    this.calculateTotalTeamValue();
  }

  calculateTotalTeamValue(): void {
    const team = this.axieTeam.team;
    this.axieTeam.auction = {
      currentPriceUSD: String(
        Number(team.back?.auction?.currentPriceUSD || 0) +
          Number(team.mid?.auction?.currentPriceUSD || 0) +
          Number(team.front?.auction?.currentPriceUSD || 0)
      ),
      currentPrice: String(
        Number(team.back?.auction?.currentPrice) ||
          0 + Number(team.mid?.auction?.currentPrice) ||
          0 + Number(team.front?.auction?.currentPrice) ||
          0
      ),
    };
  }
}
