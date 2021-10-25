import { AxieTeamPositionEnum } from '../constants/axie.constants';
import { AxieTeam, AxieTeamPosition } from '../models/axie-team.model';
import { createAction, props } from '@ngrx/store';

export const addTeam = createAction('[Teams List] Add Team', props<{ axieTeam: AxieTeam }>());

export const addAxieToTeam = createAction(
  '[Teams List] Add Axie To Team',
  props<{ axie: AxieTeamPosition; teamName: string }>()
);

export const removeAxieFromTeam = createAction(
  '[Teams List] Remove Axie From Team',
  props<{ position: AxieTeamPositionEnum; teamName: string }>()
);

export const removeTeam = createAction('[Team List] Remove Team', props<{ teamName: string }>());

export const retrievedTeamList = createAction('[Team List] Retrieved Teams Success');
