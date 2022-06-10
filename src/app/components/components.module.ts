import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { InfoChipComponent } from './info-chip/info-chip.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonComponent,
    InfoChipComponent,
  ],
  imports: [
    MatIconModule,
    CommonModule
  ],
  exports: [
    ButtonComponent,
    InfoChipComponent,
  ],
})
export class ComponentsModule {}
