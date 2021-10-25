import { AxieDetail } from '../models/axie-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AxiesService {
  readonly DOMAIN = 'https://graphql-gateway.axieinfinity.com';
  readonly GRAPHQL_AXIE_ID = (axieId: string) => ({
    query: `query GetAxieDetail($axieId: ID!) {\n  axie(axieId: $axieId) {\n    ...AxieDetail\n    __typename\n  }\n}\n\nfragment AxieDetail on Axie {\n  id\n  image\n  class\n  chain\n  name\n  genes\n  owner\n  birthDate\n  bodyShape\n  class\n  sireId\n  sireClass\n  matronId\n  matronClass\n  stage\n  title\n  breedCount\n  level\n  figure {\n    atlas\n    model\n    image\n    __typename\n  }\n  parts {\n    ...AxiePart\n    __typename\n  }\n  stats {\n    ...AxieStats\n    __typename\n  }\n  auction {\n    ...AxieAuction\n    __typename\n  }\n  ownerProfile {\n    name\n    __typename\n  }\n  battleInfo {\n    ...AxieBattleInfo\n    __typename\n  }\n  children {\n    id\n    name\n    class\n    image\n    title\n    stage\n    __typename\n  }\n  __typename\n}\n\nfragment AxieBattleInfo on AxieBattleInfo {\n  banned\n  banUntil\n  level\n  __typename\n}\n\nfragment AxiePart on AxiePart {\n  id\n  name\n  class\n  type\n  specialGenes\n  stage\n  abilities {\n    ...AxieCardAbility\n    __typename\n  }\n  __typename\n}\n\nfragment AxieCardAbility on AxieCardAbility {\n  id\n  name\n  attack\n  defense\n  energy\n  description\n  backgroundUrl\n  effectIconUrl\n  __typename\n}\n\nfragment AxieStats on AxieStats {\n  hp\n  speed\n  skill\n  morale\n  __typename\n}\n\nfragment AxieAuction on Auction {\n  startingPrice\n  endingPrice\n  startingTimestamp\n  endingTimestamp\n  duration\n  timeLeft\n  currentPrice\n  currentPriceUSD\n  suggestedPrice\n  seller\n  listingIndex\n  state\n  __typename\n}\n`,
    variables: {
      axieId,
    },
    operationName: 'GetAxieDetail',
  });

  constructor(private httpClient: HttpClient) {}

  getAxie(axieId: string): Observable<AxieDetail> {
    return this.httpClient.post(`${this.DOMAIN}/graphql`, this.GRAPHQL_AXIE_ID(axieId)).pipe(
      map(
        (response: any): AxieDetail => ({
          id: response.data.axie.id,
          auction: response.data?.axie?.auction
            ? {
                currentPriceUSD: response.data.axie.auction.currentPriceUSD,
                currentPrice: response.data.axie.auction.currentPrice,
              }
            : null,
          class: response.data.axie.class,
          image: response.data.axie.image,
          name: response.data.axie.name,
          stats: response.data.axie.stats,
          parts: response.data.axie.parts,
        })
      ),
      catchError((err, caught) => {
        return throwError(err);
      })
    );
  }
}
