import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ItemDto } from '../models/item-dto';
import { ItemListQuery } from '../models/item-list-query';
const ITEMS: ItemDto[] = [
  {
    id: 1,
    type: 'article',
    title: 'title1',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-01T09:02:25.095+0000',
    views: 11050,
  },
  {
    id: 2,
    type: 'video',
    title: 'title2',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-09-30T14:03:44.667+0000',
    views: 158,
  },
  {
    id: 3,
    type: 'video',
    title: 'title3',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-09-03T08:01:31.931+0000',
    views: 365,
  },
  {
    id: 4,
    type: 'article',
    title: 'title4',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-08-25T11:05:12.744+0000',
    views: 536,
  },
  {
    id: 5,
    type: 'video',
    title: 'title5',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-08-12T10:11:08.221+0000',
    views: 11536,
  },
  {
    id: 6,
    type: 'article',
    title: 'title6',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-08-12T09:08:03.566+0000',
    views: 15,
  },
  {
    id: 7,
    type: 'article',
    title: 'title7',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-05T21:12:16.000+0000',
    views: 158,
  },
  {
    id: 8,
    type: 'article',
    title: 'title8',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-05T21:01:58.000+0000',
    views: 3596,
  },
  {
    id: 9,
    type: 'video',
    title: 'title9',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-11-09T14:05:20.000+0000',
    views: 1576,
  },
  {
    id: 10,
    type: 'video',
    title: 'title10',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-11-14T14:03:24.000+0000',
    views: 15763,
  },
  {
    id: 11,
    type: 'article11',
    title: 'title',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-11T14:06:47.000+0000',
    views: 658,
  },
  {
    id: 12,
    type: 'video12',
    title: 'title',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-11T14:07:31.000+0000',
    views: 9684,
  },
  {
    id: 13,
    type: 'article',
    title: 'title13',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-01T12:12:16.736+0000',
    views: 1573,
  },
  {
    id: 14,
    type: 'video',
    title: 'title14',
    content: 'content',
    videoSrc:
      '../../../assets/videoplayback.mp4',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-10-01T08:07:58.640+0000',
    views: 3658,
  },
  {
    id: 15,
    type: 'article',
    title: 'title15',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-09-10T15:05:20.763+0000',
    views: 1759,
  },
  {
    id: 16,
    type: 'vide',
    title: 'title16',
    content: 'content',
    videoSrc: 'src',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-09-15T14:12:24.719+0000',
    views: 3658,
  },
  {
    id: 17,
    type: 'article',
    title: 'title17',
    content: 'content',
    videoSrc: '',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-08-12T10:05:47.347+0000',
    views: 125,
  },
  {
    id: 18,
    type: 'vide',
    title: 'title18',
    content: 'content',
    videoSrc: 'src',
    imgSrc: 'https://picsum.photos/200/150',
    publishDate: '2020-08-12T09:01:31.938+0000',
    views: 3658,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}
  getList(query: ItemListQuery): Observable<ItemDto[]> {
    const time = timer(300);
    return time.pipe(
      map(() => {
        let items = ITEMS.sort((a, b) => a.id - b.id);
        items = query.type
          ? ITEMS.filter((item) => item.type === query.type)
          : ITEMS;
        if (query.order) {
          if (query.order === 'views') {
            items = items.sort((a, b) => a.views - b.views);
          } else if (query.order === 'publishDate') {
            items = items.sort(
              (a, b) =>
                <any>new Date(a.publishDate) - <any>new Date(b.publishDate)
            );
          }
        }
        return items.slice(query.scroll * 8, query.scroll * 8 + 8);
      })
    );
  }
  getById(id: number): Observable<ItemDto | {}> {
    const time = timer(300);
    return time.pipe(
      map(() => {
        const item = ITEMS.find((item) => item.id === id);
        return item ? item : {};
      })
    );
  }
}
