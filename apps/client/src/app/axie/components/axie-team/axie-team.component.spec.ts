import { EthereumPipe } from './../../../ethereum.pipe';
import { AxieDetail } from './../../models/axie-detail.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AxieTeamPositionEnum } from '../../constants/axie.constants';
import { AxieTeamPosition } from '../../models/axie-team.model';

import { AxieTeamComponent } from './axie-team.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const axieMock: AxieDetail = {
  id: 'axieId',
  stats: {
    hp: 20,
    morale: 21,
    skill: 22,
    speed: 23,
  },
  name: 'axie Name',
  auction: {
    currentPriceUSD: '100',
    currentPrice: '1000000000000000000',
  },
  parts: [
    {
      id: 'part-id',
      class: 'plant',
      abilities: ['ability'],
      stage: 0,
      type: 'generic-type',
    },
  ],
};

describe('AxieTeamComponent', () => {
  let component: AxieTeamComponent;
  let fixture: ComponentFixture<AxieTeamComponent>;

  const axieTeamPosition: AxieTeamPosition = {
    position: AxieTeamPositionEnum.back,
    axie: axieMock,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AxieTeamComponent, EthereumPipe],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AxieTeamComponent);
    component = fixture.componentInstance;
    component.axieTeam = {
      teamName: 'teamMock',
      team: {},
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an axie to the when triggering the method set axie', () => {
    component.setAxie(axieTeamPosition);
    fixture.detectChanges();

    expect(component.axieTeam.team.back?.id).toBe(axieTeamPosition.axie.id);
  });

  it('should change the total worth value when adding an axie to the team', () => {
    jest.spyOn(component, 'calculateTotalTeamValue');
    component.setAxie(axieTeamPosition);
    fixture.detectChanges();

    expect(component.axieTeam.auction?.currentPrice).toBe(axieTeamPosition.axie.auction?.currentPrice);
    expect(component.axieTeam.auction?.currentPriceUSD).toBe(axieTeamPosition.axie.auction?.currentPriceUSD);
    expect(component.calculateTotalTeamValue).toHaveBeenCalled();
  });

  it('should change the total worth value when clearing an axie from team', () => {
    jest.spyOn(component, 'calculateTotalTeamValue');
    component.setAxie(axieTeamPosition);
    fixture.detectChanges();
    component.deleteAxie(axieTeamPosition.position);
    fixture.detectChanges();

    expect(component.axieTeam.auction?.currentPrice).toBe('0');
    expect(component.axieTeam.auction?.currentPriceUSD).toBe('0');
    expect(component.calculateTotalTeamValue).toHaveBeenCalledTimes(2);
  });
});
