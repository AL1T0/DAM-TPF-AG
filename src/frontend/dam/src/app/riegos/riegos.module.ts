import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiegosPageRoutingModule } from './riegos-routing.module';

import { RiegosPage } from './riegos.page';

import { EstadoPipe } from '../pipes/estado.pipe';
import { MouseHoverDirective } from '../directives/mouse.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiegosPageRoutingModule
  ],
  declarations: [RiegosPage, EstadoPipe, MouseHoverDirective]
})
export class RiegosPageModule {}
