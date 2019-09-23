import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CountDto } from '../../../dto/countDto';
import { PublicNewsService } from '../../../services/publicNews.service';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { NewsDto } from '../../../dto/newsDto';
import { LangDto } from '../../../dto/langDto';
declare global {
  interface Document {
      documentMode?: any;
  }
}

@Component({
  selector: 'app-news-by-type',
  templateUrl: './news-by-type.component.html',
  styleUrls: ['./news-by-type.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsByTypeComponent implements OnDestroy {

  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= max - 200)   {
      if (this.flag) {
        this.getNewsListByType();
        this.flag = false; 
      }
    } else if (!this.flag){
      this.flag = true;
    }
  }

  private flag;
  private typeName: string;
  private from: number;
  private amount: number;
  public news: Array<NewsDto>;
  public navigationSubscription;

  constructor(private router: Router, private location: Location, private activeRoute: ActivatedRoute, private publicNewsService: PublicNewsService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.activeRoute.params.forEach(params =>{
      this.typeName = params["type"];
      if (!this.news || this.news.length === 0) {
        this.initialiseInvites(); 
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private initialiseInvites() {
    if (this.typeName) {
        this.from = 0;
        this.amount = 9;
        this.news = [];
        this.getNewsListByType();
    }
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
          this.news = this.news.concat(data);
        },
        error => {
          if (error.status === 401) {
            document.getElementById("chiqish").click();
          }
        }
      );
    } else {
      this.publicNewsService.getNewsListByType(count).subscribe(
        (data) => {
          this.news = this.news.concat(data);
        },
        error => console.log(error)
      );
    }
  }
}