import { Component, OnInit, HostListener } from '@angular/core';
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

  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    let max = document.documentElement.scrollHeight;
    if(pos >= max - 200)   {
      if (this.flag) {
        this.getNotPublishedNewsList();
        this.flag = false; 
      }
    } else if (!this.flag){
      this.flag = true;
    }
  }

  private flag;
  public NPnews: Array<NewsDto>;
  private from: number = 0;
  private amount: number = 9;
  private isEndOfNews: Boolean = false;

  constructor(private newsService: NewsService) {
    this.NPnews = [];
  }

  ngOnInit() {
    this.getNotPublishedNewsList();
  }

  private getNotPublishedNewsList() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    this.from += this.amount;

    this.newsService.getNotPublishedNewsList(count).subscribe(
      (data) => {
        this.NPnews = this.NPnews.concat(data);
        console.log(data);
        
        if (data.length < this.amount) {
          this.isEndOfNews = true;
        }
      },
      error => console.log(error)
    );
  }

  public onPublish(e) {
    this.from = 0;
    this.NPnews = [];
    this.getNotPublishedNewsList();
  }
}