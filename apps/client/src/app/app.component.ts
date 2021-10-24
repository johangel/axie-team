import { user } from './../../../../libs/models/src/lib/models';
import { Component } from '@angular/core';

@Component({
  selector: 'nx-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  user: user = {
    name: 'Johangel',
    age: 26,
    gender: 'Male',
    id: '1',
  };
}
