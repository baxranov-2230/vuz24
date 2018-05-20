import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CountDto } from '../../../dto/countDto';
import { NewsDto } from '../../../dto/newsDto';

@Component({
  selector: 'app-not-published-news',
  templateUrl: './not-published-news.component.html',
  styleUrls: ['./not-published-news.component.scss'],
  providers: [NewsService]
})
export class NotPublishedNewsComponent implements OnInit {

  public NPnews: Array<NewsDto>;
  private from: number = 0;
  private amount: number = 9;
  private isEndOfMdrts: Boolean = false;

  constructor(private newsService: NewsService) {
    this.NPnews = [];
  }

  ngOnInit() {
    this.getNotPublishedNewsList();

    var flag = this;
    window.onscroll = (function() {
      if(!flag.isEndOfMdrts && document.getElementById('mainBody').offsetHeight <=
                                          window.pageYOffset + window.innerHeight) {
        flag.getNotPublishedNewsList();
      }
    });
  }

  private getNotPublishedNewsList() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    this.from += this.amount;

    this.newsService.getNotPublishedNewsList(count).subscribe(
      (data) => {
        this.NPnews = this.NPnews.concat(data);
        if (data.length < this.amount) {
          this.isEndOfMdrts = true;
        }
      },
      error => console.log(error)
    );
  }
}