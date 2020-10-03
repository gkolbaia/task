import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { ItemDetailsComponent } from "./items/components/item-details/item-details.component";
import { ItemGridComponent } from "./items/components/item-grid/item-grid.component";
import { ItemService } from "./items/services/item.service";
import { ItemsModule } from "./items/items.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemGridComponent,
    ItemDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ItemsModule,
    NgbModule,
    InfiniteScrollModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
