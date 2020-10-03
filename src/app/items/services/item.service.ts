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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
      'https://r5---sn-4g5ednsz.googlevideo.com/videoplayback?expire=1601754325&ei=dYB4X-K_M9StxN8PvvavOA&ip=81.23.32.47&id=o-ALmgJO3tPwXnPPjjo5wbHFiEspmbZ4NetGnhu0EkqdPh&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=5222562&ratebypass=yes&dur=60.186&lmt=1416849742469236&fvip=5&fexp=23812955,23915654&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC9PGlYcUs73m6zU0kUbRlwsmt-Cx4bJC7nbO69P2CTwCIH02j2XlUnYXhWbRGSo0_PaaPJW2Fn8vfQiGhJxNAQo4&video_id=3QsKtsyYCws&title=%E1%83%99%E1%83%9D%E1%83%99%E1%83%90+%E1%83%99%E1%83%9D%E1%83%9A%E1%83%90%2C+%E1%83%90%E1%83%AE%E1%83%90%E1%83%9A%E1%83%98+%E1%83%AC%E1%83%94%E1%83%9A%E1%83%98%E1%83%90&rm=sn-25g6r76&req_id=5e04a86e555da3ee&ipbypass=yes&cm2rm=sn-npa3oxu-ucns76,sn-4g5edz76&redirect_counter=3&cms_redirect=yes&mh=uA&mip=185.83.36.4&mm=34&mn=sn-4g5ednsz&ms=ltu&mt=1601732402&mv=u&mvi=5&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgO9zDTFWkyGzcaozBhrAvtmFeZJG_xsNh4Jcf4027Mc8CIH82UAXsST12MMRRuXxV89nujAuk0kmVAZLMpaFLadsa',
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
