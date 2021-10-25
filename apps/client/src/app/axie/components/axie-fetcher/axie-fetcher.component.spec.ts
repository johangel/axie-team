import { By } from '@angular/platform-browser';
import { AxieComponent } from './../axie/axie.component';
import { AxiesService } from './../../services/axies.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieFetcherComponent } from './axie-fetcher.component';
import { of } from 'rxjs';
import { AxieTeamPositionEnum } from '../../constants/axie.constants';

describe('AxieFetcherComponent', () => {
  let component: AxieFetcherComponent;
  let fixture: ComponentFixture<AxieFetcherComponent>;
  let axieServiceMock: any;

  beforeEach(async () => {
    axieServiceMock = {
      getAxie: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [AxieFetcherComponent, AxieComponent],
      providers: [{ provide: AxiesService, useValue: axieServiceMock }],
    }).compileComponents();
    axieServiceMock.getAxie.mockReturnValueOnce(
      of({
        id: 'axieId',
      })
    );
    fixture = TestBed.createComponent(AxieFetcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAxie() from service when use fetchAxieData', () => {
    component.position = AxieTeamPositionEnum.back;
    component.fetchAxieData('1');
    expect(axieServiceMock.getAxie.mock.calls[0][0]).toEqual('1');
    expect(component.axie$).toBeDefined();
  });

  it('should clear axie when clear() called', () => {
    component.position = AxieTeamPositionEnum.back;
    jest.spyOn(component.deleteAxie, 'emit');

    component.fetchAxieData('1');
    component.clear();

    expect(component.deleteAxie.emit).toHaveBeenLastCalledWith(AxieTeamPositionEnum.back);
    expect(component.axie$).toBe(null);
  });

  it('should display the position of the axie', () => {
    component.position = AxieTeamPositionEnum.back;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.axie-form p')).nativeElement.textContent).toContain(
      AxieTeamPositionEnum.back
    );
  });
});
