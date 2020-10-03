import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found/not-found.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { ItemGridComponent } from './components/item-grid/item-grid.component';

const routes: Routes = [
  {
    path: '',
    component: ItemGridComponent,
  },
  {
    path: ':id',
    component: ItemDetailsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
