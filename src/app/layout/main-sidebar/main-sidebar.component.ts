import { Component, OnInit } from '@angular/core';
import { PublicNewsService } from '../../services/publicNews.service';
import { Location } from '@angular/common';
import { NewsDto } from '../../dto/newsDto';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
  providers: [PublicNewsService]
})
export class MainSidebarComponent implements OnInit {

  public hotNews: Array<NewsDto>;

  constructor(private newsService: PublicNewsService, private location: Location) { }

  ngOnInit() {
    this.getImportantNewsList();
  }

  private getImportantNewsList() {
    this.newsService.getImportantNewsList(this.location.path().split('/')[1]).subscribe(
      (data) => {
        this.hotNews = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }
}