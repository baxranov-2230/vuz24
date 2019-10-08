import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewsDto } from '../../../../dto/newsDto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewsService } from '../../../../services/news.service';
import { Router } from '@angular/router';
import { CountDto } from '../../../../dto/countDto';
declare var $;

@Component({
  selector: 'app-not-published-news-item',
  templateUrl: './not-published-news-item.component.html',
  styleUrls: ['./not-published-news-item.component.scss'],
  providers: [ NewsService ]
})
export class NotPublishedNewsItemComponent implements OnInit {

  @Input() newsItem: NewsDto;
  @Output() isPublished: EventEmitter<any> = new EventEmitter();;
  public imgSrc: string;
  public content: SafeHtml;
  public target: string;
  public time: string;
  public date: string;

  constructor(private sanitizer: DomSanitizer, private newsService: NewsService) { }

  ngOnInit() {
    
    
    setTimeout(() => {
      console.log($(this.newsItem));
      document.getElementById("target" + this.newsItem.id).setAttribute('data-target', "#newsInModal" + this.newsItem.id);
    }, 500);

    try {
      if ($(this.newsItem.content).find('img').length > 0 && $("<p>" + this.newsItem.content + "</p>").find('img').length > 0) {
        this.imgSrc = $("<p>" + this.newsItem.content + "</p>").find('img')[0].src;
        this.content = this.sanitizer.bypassSecurityTrustHtml(this.newsItem.content);
      } else {
        this.imgSrc = "assets/images/logo.png";
      }

    } catch (e) {
      this.imgSrc = "assets/images/logo.png";
    }
  }

  public publishNews() {
    document.getElementById("closeBtn" + this.newsItem.id).click();
    setTimeout(() => {
      this.newsService.publishNews(this.newsItem.nlId).subscribe(
        (data) => {
          if (data.state === 1) {
            this.isPublished.emit(true);
          }
        },
        error => console.log(error)
      );
    }, 100);
  }

  public deleteNews() {
    document.getElementById("closeBtn" + this.newsItem.id).click();
    setTimeout(() => {
      this.newsService.deleteNews(this.newsItem.nlId).subscribe(
        (data) => {
          if (data.state === 1) {
            this.isPublished.emit(true);
          }
        },
        error => console.log(error)
      );
    }, 100);
  }

  public disableNews() {
    document.getElementById("closeBtn" + this.newsItem.id).click();

    var count = new CountDto();
    count.newsId = this.newsItem.nlId;
    count.reason = (<HTMLInputElement>document.getElementById("returnReason")).value;

    console.log(count);
    
    setTimeout(() => {
      this.newsService.disableNews(count).subscribe(
        (data) => {
          console.log(data);
          
          if (data.state === 1) {
            
          }
        },
        error => console.log(error)
      );
    }, 100);
  }
}