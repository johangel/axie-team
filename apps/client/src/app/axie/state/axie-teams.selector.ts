import { AxieTeam } from './../models/axie-team.model';
import { AppState } from './../app.state';
import { createSelector } from '@ngrx/store';

export const selectTeams = createSelector(
  (state: AppState) => state.axiesTeams,
  (axiesTeams: Array<AxieTeam>) => axiesTeams
);
