import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from '../components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    HomeRoutingModule,
    ComponentsModule,
    CommonModule,
  ],
  providers: [],
})
export class HomeModule {
}
