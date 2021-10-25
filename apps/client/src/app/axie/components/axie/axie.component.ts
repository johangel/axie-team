import { AxieDetail } from '../../models/axie-detail.model';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'axie-component',
  templateUrl: './axie.component.html',
  styleUrls: ['./axie.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AxieComponent {
  @Input() axie!: AxieDetail;
  @Output() clear: EventEmitter<string> = new EventEmitter<string>();
}
