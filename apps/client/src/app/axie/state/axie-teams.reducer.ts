import { removeTeam, retrievedTeamList, addAxieToTeam, removeAxieFromTeam, addTeam } from './axie-teams.actions';
import { AxieTeam } from '../models/axie-team.model';
import { createReducer, on } from '@ngrx/store';

export const initialState: ReadonlyArray<AxieTeam> = [];

export const axiesTeamsReducer = createReducer(
  initialState,
  on(retrievedTeamList, (state) => state),
  on(addTeam, (state, { axieTeam }) => {
    return [...state, axieTeam];
  }),
  on(removeTeam, (state, { teamName }) => {
    return state.filter((team) => team.teamName !== teamName);
  }),
  on(addAxieToTeam, (state: ReadonlyArray<AxieTeam>, { axie, teamName }) => {
    const teamIndex = state.findIndex((team) => team.teamName === teamName);
    state[teamIndex].team[axie.position] = axie.axie;
    return state;
  }),
  on(removeAxieFromTeam, (state, { position, teamName }) => {
    const teamIndex = state.findIndex((team) => team.teamName === teamName);
    state[teamIndex].team[position] = null;
    return state;
  })
);
