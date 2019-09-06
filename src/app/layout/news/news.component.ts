import { Component, HostListener, OnDestroy } from '@angular/core';
import { PublicNewsService } from '../../services/publicNews.service';
import { Location } from '@angular/common';
import { CountDto } from '../../dto/countDto';
import { LocalStorageSecurity } from '../../util/localStorageSecurity';
import { CommonKey } from '../../util/commonKey';
import { LangDto } from '../../dto/langDto';
import { NewsDto } from '../../dto/newsDto';
import { Router, NavigationEnd } from '@angular/router';
declare global {
  interface Document {
      documentMode?: any;
  }
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsComponent implements OnDestroy {

  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= max - 200)   {
      if (this.flag) {
        this.getRecentNews();
        this.flag = false; 
      }
    } else if (!this.flag){
      this.flag = true;
    }
  }
  
  private flag;
  private from: number;
  private amount: number;
  public news: Array<NewsDto>;
  public mostReadNews: Array<NewsDto>;
  public navigationSubscription;

  constructor(private publicNewsService: PublicNewsService, private location: Location, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private initialiseInvites() {
    this.news = [];
    this.mostReadNews = [];
    this.from = 0;
    this.amount = 9;
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
        },
        error => {
          if (error.status === 401) {
            document.getElementById("chiqish").click();
          }
        }
      );
    } else {
      this.publicNewsService.getRecentNewsList(count).subscribe(
        (data) => {
          this.news = this.news.concat(data);
        },
        error => console.log(error)
      );
    }
  }

  private getMostReadNews() {
    var count = new CountDto();
    count.from = 0;
    count.to = 4;
    count.lang = this.location.path().split('/')[1];

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.publicNewsService.getMostReadNewsListWithToken(count).subscribe(
        (data) => {
          this.mostReadNews = this.mostReadNews.concat(data);
        },
        error => {
          if (error.status === 401) {
            document.getElementById("chiqish").click();
          }
        }
      );
    } else {
      this.publicNewsService.getMostReadNewsList(count).subscribe(
        (data) => {
          this.mostReadNews = this.mostReadNews.concat(data);
        },
        error => console.log(error)
      );
    }
  }
}