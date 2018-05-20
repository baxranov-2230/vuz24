import { Component, OnInit } from '@angular/core';
import { PublicNewsService } from '../../services/publicNews.service';
import { Location } from '@angular/common';
import { CountDto } from '../../dto/countDto';
import { LocalStorageSecurity } from '../../util/localStorageSecurity';
import { CommonKey } from '../../util/commonKey';
import { LangDto } from '../../dto/langDto';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ PublicNewsService ]
})
export class NewsComponent implements OnInit {

  private from: number = 0;
  private amount: number = 9;

  constructor(private publicNewsService: PublicNewsService, private location: Location) {}

  ngOnInit() {
    this.getAllNews();

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.getMostReadNewsWithToken();
    } else {
      this.getMostReadNewsWithOUTToken();
    }
  }

  private getMostReadNewsWithOUTToken() {
    console.log('yoq');
    
  }

  private getMostReadNewsWithToken() {
    console.log('bor');
    
  }

  private getAllNews() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    count.lang = new LangDto();
    count.lang.key = this.location.path().split('/')[1];
    this.from += this.amount;

    this.publicNewsService.getAllNewsList(count).subscribe(
      (data) => {
        console.log(data);
      },
      error => console.log(error)
    );
  }
}