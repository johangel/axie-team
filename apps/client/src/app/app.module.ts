import { environment } from './../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { SETTINGS as AUTH_SETTINGS, PERSISTENCE } from '@angular/fire/compat/auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AxiesService } from './axie/services/axies.service';
import { AxieComponent } from './axie/components/axie/axie.component';
import { EthereumPipe } from './ethereum.pipe';
import { AxieTeamComponent } from './axie/components/axie-team/axie-team.component';
import { AxieFetcherComponent } from './axie/components/axie-fetcher/axie-fetcher.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './axie/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { axiesTeamsReducer } from './axie/state/axie-teams.reducer';

@NgModule({
  declarations: [AppComponent, AxieComponent, EthereumPipe, AxieTeamComponent, AxieFetcherComponent],
  imports: [
    MatIconModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ axiesTeams: axiesTeamsReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    AxiesService,
    AuthService,
    { provide: PERSISTENCE, useValue: 'session' },
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
