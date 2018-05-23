import { Component, OnInit } from '@angular/core';
import { PublicNewsService } from '../../services/publicNews.service';
import { Location } from '@angular/common';
import { CountDto } from '../../dto/countDto';
import { LocalStorageSecurity } from '../../util/localStorageSecurity';
import { CommonKey } from '../../util/commonKey';
import { LangDto } from '../../dto/langDto';
import { NewsDto } from '../../dto/newsDto';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsComponent implements OnInit {

  private from: number = 0;
  private amount: number = 9;
  public news: Array<NewsDto>;
  public mostReadNews: Array<NewsDto>;

  constructor(private publicNewsService: PublicNewsService, private location: Location) {
    this.news = [];
    this.mostReadNews = [];
  }

  ngOnInit() {
      this.getRecentNews();
      this.getMostReadNews();
  }

  private getRecentNews() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    count.lang = this.location.path().split('/')[1];
    this.from += this.amount;

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.publicNewsService.getRecentNewsListWithToken(count).subscribe(
        (data) => {
          this.news = this.news.concat(data);
          console.log(this.news);
        },
        error => console.log(error)
      );
    } else {
      this.publicNewsService.getRecentNewsList(count).subscribe(
        (data) => {
          this.news = this.news.concat(data);
          console.log(this.news);
        },
        error => console.log(error)
      );
    }
  }

  private getMostReadNews() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    count.lang = this.location.path().split('/')[1];
    this.from += this.amount;

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.publicNewsService.getMostReadNewsListWithToken(count).subscribe(
        (data) => {
          this.mostReadNews = this.mostReadNews.concat(data);
          console.log(this.mostReadNews);
        },
        error => console.log(error)
      );
    } else {
      this.publicNewsService.getMostReadNewsList(count).subscribe(
        (data) => {
          this.mostReadNews = this.mostReadNews.concat(data);
          console.log(this.mostReadNews);
        },
        error => console.log(error)
      );
    }
  }
}