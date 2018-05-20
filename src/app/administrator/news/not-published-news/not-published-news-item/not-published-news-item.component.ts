import { Component, OnInit, Input } from '@angular/core';
import { NewsDto } from '../../../../dto/newsDto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsService } from '../../../../services/news.service';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-not-published-news-item',
  templateUrl: './not-published-news-item.component.html',
  styleUrls: ['./not-published-news-item.component.scss'],
  providers: [ NewsService ]
})
export class NotPublishedNewsItemComponent implements OnInit {

  @Input() newsItem: NewsDto;
  public imgSrc: string;
  public content: SafeHtml;
  public target: string;
  public time: string;
  public date: string;

  constructor(private sanitizer: DomSanitizer, private newsService: NewsService, private router: Router) { }

  ngOnInit() {
    console.log(this.newsItem);
    
    setTimeout(() => {
      document.getElementById("target" + this.newsItem.id).setAttribute('data-target', "#newsInModal" + this.newsItem.id);
    }, 500);

    try {
      this.imgSrc = $(this.newsItem.content).find('img')[0].src;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.newsItem.content);
    } catch (e) {
        console.log('Could not find <img>!');
    }
  }

  public publishNews() {
    document.getElementById("closeBtn" + this.newsItem.id).click();
    setTimeout(() => {
      this.newsService.publishNews(this.newsItem.id).subscribe(
        (data) => {
          console.log(data);
          
          if (data.state === 1) {
            this.router.navigate(["administrator/published-news"]);
          }
        },
        error => console.log(error)
      );
    }, 100);
  }
}