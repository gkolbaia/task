import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { ItemDto } from '../../models/item-dto';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemService,
  ) {}
  item: ItemDto;
  ngOnInit(): void {
    this.getItem();
  }
  get id() {
    return Number(this.route.snapshot.params.id);
  }
  getItem() {
    this.itemsService.getById(this.id).subscribe((res:ItemDto) => {
      this.item = res;
    });
  }

}
