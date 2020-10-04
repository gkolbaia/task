import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { ItemListQuery } from '../../models/item-list-query';
import { ItemDto } from '../../models/item-dto';
@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.css'],
})
export class ItemGridComponent implements OnInit {
  viewsFilter: boolean = false;
  publishDateFilter: boolean = false;
  items: ItemDto[];
  query: ItemListQuery = { type: null, order: null, scroll: 0 };

  constructor(private itemsService: ItemService) {}

  ngOnInit(): void {
    this.getItems();
  }
  filter(filterValue: string): void {
    this.query.scroll = 0;
    this.query.type = filterValue;
    this.getItems();
  }
  getItems(): void {
    this.itemsService.getList(this.query).subscribe((res: ItemDto[]) => {
      this.items = res;
    });
  }
  sort(sortType: string): void {
    this.query.scroll = 0;
    this.query.order =
      this.query.order &&
      this.query.order.length &&
      this.query.order === sortType
        ? null
        : sortType;
    this.getItems();
    if (sortType === 'views') {
      this.publishDateFilter = false;
      this.viewsFilter = !this.viewsFilter;
    }
    if (sortType === 'publishDate') {
      this.viewsFilter = false;
      this.publishDateFilter = !this.publishDateFilter;
    }
  }
  onScroll(e) {
    this.query.scroll += 1;
    this.itemsService.getList(this.query).subscribe((res: ItemDto[]) => {
      if (res && res.length) {
        this.items = this.items.concat(res);
      } else {
        this.query.scroll -= 1;
      }
    });
  }
}
