import { AxieTeamPositionEnum } from '../constants/axie.constants';
import { AxieDetail } from './axie-detail.model';

export interface AxieTeamPosition {
  axie: AxieDetail;
  position: AxieTeamPositionEnum;
}

export interface AxieTeam {
  teamName: string;
  team: {
    front?: AxieDetail | null;
    back?: AxieDetail | null;
    mid?: AxieDetail | null;
  };
  auction?: Auction;
}

export interface Auction {
  currentPriceUSD: string;
  currentPrice: string;
}
