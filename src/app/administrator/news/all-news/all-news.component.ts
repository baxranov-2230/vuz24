import { Component, OnInit, HostListener } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { CountDto } from '../../../dto/countDto';
import { NewsDto } from '../../../dto/newsDto';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
  providers: [NewsService]
})
export class AllNewsComponent implements OnInit {

  @HostListener("window:scroll", ["$event"])
    onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    let max = document.documentElement.scrollHeight;
    
    if(pos >= max)   {
      if (this.flag) {
        this.getNewsList();
        this.flag = false; 
      }
    } else if (!this.flag){
      this.flag = true;
    }
  }

  private flag;
  public NPnews: Array<NewsDto>;
  private from: number = 0;
  private amount: number = 25;
  private isEndOfNews: Boolean = false;

  constructor(private newsService: NewsService) {
    this.NPnews = [];
  }

  ngOnInit() {
    this.getNewsList();
  }

  private getNewsList() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    this.from += this.amount;

    this.newsService.getNewsLangTree(count).subscribe(
      (data) => {
        console.log(data);
        
        this.NPnews = this.NPnews.concat(data);
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
    this.getNewsList();
  }

  public deleteNews(id) {
    setTimeout(() => {
      this.newsService.deleteNews(id).subscribe(
        (data) => {
          if (data.state == 1) {
            this.from = 0;
            this.NPnews = [];
            this.getNewsList();
          }
        },
        error => console.log(error)
      );
    }, 100);
  }
}
