import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicNewsService } from '../../../services/publicNews.service';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NewsDto } from '../../../dto/newsDto';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsDetailComponent implements OnInit {

  private newsId: number;
  public content: SafeHtml;
  public newsItem: NewsDto;

  constructor(private sanitizer: DomSanitizer, private activeRoute: ActivatedRoute, private newsService: PublicNewsService) { }

  ngOnInit() {
    this.activeRoute.params.forEach(params =>{
      this.newsId = params["id"];
      if (this.newsId) {
        this.getNews();
      }
    });
  }

  private getNews() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.newsService.getNewsWithToken(this.newsId).subscribe(
        (data) => {
          console.log(data);
          this.newsItem = data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(data.content);
        },
        (error) => console.log(error)
      );
    } else {
      this.newsService.getNews(this.newsId).subscribe(
        (data) => {
          console.log(data);
          this.newsItem = data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(data.content);
        },
        (error) => console.log(error)
      );
    }
  }
}