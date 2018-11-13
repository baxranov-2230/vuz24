import { Component, OnInit } from '@angular/core';
import { PublicNewsService } from '../../services/publicNews.service';
import { Location } from '@angular/common';
import { NewsDto } from '../../dto/newsDto';
import { CountDto } from '../../dto/countDto';
import { NewsType } from '../../util/newsType';
declare var $;

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  providers: [PublicNewsService, NewsType]
})
export class MainSidebarComponent implements OnInit {

  public hotNews: Array<NewsDto>;
  public isUzl: boolean = false;
  public isUzk: boolean = false;

  constructor(private newsTypeService: NewsType, private newsService: PublicNewsService, private location: Location) {
    this.hotNews = [];
  }

  ngOnInit() {
    if (location.pathname.split("/")[1] === 'uzl') {
      this.isUzl = true;
      this.isUzk = false;
    } else if (location.pathname.split("/")[1] === 'uzk') {
      this.isUzk = true;
      this.isUzl = false;
    }
    this.getImportantNewsList();
  }

  private getImportantNewsList() {
    this.newsService.getImportantNewsList(this.location.path().split('/')[1]).subscribe(
      (data) => {
        for (let x of data) {
          this.hotNews = this.hotNews.concat(x);
          try {
            x.imgSrc = $(x.content).find('img')[0].src;
            x.newsType.name = this.newsTypeService.getNewsTypeName(x.newsType.key);
          } catch (e) {
            console.log('Could not find <img>!');
          }
        }

        setTimeout(() => {
          if (this.hotNews.length > 0) {
            var comeOn = window.innerHeight - document.getElementById('mainSide').offsetHeight;
            document.getElementById('mainSide').style.top = "calc(" + comeOn + "px - 1rem)";
          }
        }, 500);
      },
      error => console.log(error)
    );
  }
}