import { By } from '@angular/platform-browser';
import { AxieDetail } from './../../models/axie-detail.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxieComponent } from './axie.component';

describe('AxieComponent', () => {
  let component: AxieComponent;
  let fixture: ComponentFixture<AxieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxieComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AxieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const axie: AxieDetail = {
      id: 'axieId',
    };
    component.axie = axie;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('it should display the axie data', () => {
    const axie: AxieDetail = {
      id: 'axieId',
      stats: {
        hp: 20,
        morale: 21,
        skill: 22,
        speed: 23,
      },
      name: 'axie Name',
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
    component.axie = axie;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.axie')).nativeElement.textContent).toContain('ID: axieId');
    expect(fixture.debugElement.query(By.css('.axie-details ul')).nativeElement.textContent).toContain('hp: 20');
    expect(fixture.debugElement.query(By.css('.axie-details .axie-parts ul')).nativeElement.textContent).toContain(
      'part-id'
    );
  });
});
