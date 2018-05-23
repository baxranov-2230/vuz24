import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CountDto } from '../../../dto/countDto';
import { PublicNewsService } from '../../../services/publicNews.service';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { NewsDto } from '../../../dto/newsDto';

@Component({
  selector: 'app-news-by-type',
  templateUrl: './news-by-type.component.html',
  styleUrls: ['./news-by-type.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsByTypeComponent implements OnInit {

  private typeName: string;
  private from: number;
  private amount: number;
  public news: Array<NewsDto>;

  constructor(private location: Location, private activeRoute: ActivatedRoute, private publicNewsService: PublicNewsService) {}

  ngOnInit() {
    this.activeRoute.params.forEach(params =>{
      this.typeName = params["type"];
      if (this.typeName) {
        this.from = 0;
        this.amount = 9;
        this.news = [];
        this.getNewsListByType();
      }
    });
  }

  private getNewsListByType() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    count.lang = this.location.path().split('/')[1];
    count.type = this.typeName;
    this.from += this.amount;

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.publicNewsService.getNewsListByTypeWithToken(count).subscribe(
        (data) => {
          console.log(data);
          this.news = this.news.concat(data);
        },
        error => console.log(error)
      );
    } else {
      this.publicNewsService.getNewsListByType(count).subscribe(
        (data) => {
          console.log(data);
          this.news = this.news.concat(data);
        },
        error => console.log(error)
      );
    }
  }
}