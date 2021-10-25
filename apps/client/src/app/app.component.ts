import { Observable } from 'rxjs';
import { selectTeams } from './axie/state/axie-teams.selector';
import { addTeam, retrievedTeamList, removeTeam } from './axie/state/axie-teams.actions';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AxieTeam } from './axie/models/axie-team.model';
import { AuthService } from './axie/services/auth.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(public authService: AuthService, public store: Store) {}
  axieTeams$ = this.store.select(selectTeams as any) as Observable<AxieTeam[]>;

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  addNewTeam(teamName: string): void {
    const axieTeam = { teamName: teamName, team: {} };
    // this.axieTeams.push(axieTeam);
    this.store.dispatch(addTeam({ axieTeam }));
    // console.log(this.store.dispatch(retrievedTeamList()));
    console.log();
  }

  clearTeam(teamName: string) {
    this.store.dispatch(removeTeam({ teamName }));
  }
}
