import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStatPipe } from './get-stat-pipe';

@NgModule({
  declarations: [GetStatPipe],
  exports: [GetStatPipe]
})
export class PipesModule {}
