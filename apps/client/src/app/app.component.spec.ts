import { By } from '@angular/platform-browser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './axie/services/auth.service';
import { AxieTeamComponent } from './axie/components/axie-team/axie-team.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      signInWithPopup: jest.fn(),
      logout: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [AppComponent, AxieTeamComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, use: authServiceMock },
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new team when using', () => {
    const inputElement = <HTMLInputElement>fixture.debugElement.query(By.css('#new-team-input')).nativeElement;

    inputElement.value = 'newTeam';
    component.addNewTeam(inputElement.value);

    fixture.detectChanges();
    expect(component.axieTeams[0].teamName).toBe('newTeam');
    expect(fixture.debugElement.query(By.directive(AxieTeamComponent)).nativeElement.textContent).toContain('newTeam');
  });

  it('should remove a new team when cleared out', () => {
    const inputElement = <HTMLInputElement>fixture.debugElement.query(By.css('#new-team-input')).nativeElement;

    inputElement.value = 'newTeam';
    component.addNewTeam(inputElement.value);

    fixture.detectChanges();
    component.clearTeam('newTeam');
    fixture.detectChanges();
    expect(component.axieTeams.length).toBe(0);
  });
});
