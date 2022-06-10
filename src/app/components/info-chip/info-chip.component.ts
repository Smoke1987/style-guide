import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-chip',
  templateUrl: './info-chip.component.html',
  styleUrls: ['./info-chip.component.scss']
})
export class InfoChipComponent {

  @Input() index = 0;
}
