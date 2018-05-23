import { Component, OnInit, Input } from '@angular/core';
import { NewsDto } from '../../../dto/newsDto';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { NewsType } from '../../../util/newsType';
declare var $;

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  providers: [ NewsService, NewsType ]
})
export class NewsItemComponent implements OnInit {

  @Input() newsItem: NewsDto;
  @Input() index: number;
  public imgSrc: string;
  public content: SafeHtml;
  public target: string;
  public time: string;
  public date: string;
  public imageHeight: number;


  constructor(private sanitizer: DomSanitizer, private newsService: NewsService,
              private router: Router, private newsTypeService: NewsType) { }

  ngOnInit() {
    setTimeout(() => {
      this.newsItem.newsType.name = this.newsTypeService.getNewsTypeName(this.newsItem.newsType.key);
      this.imageHeight = $("#newsContent" + this.newsItem.nlId).height() + 15;
      setTimeout(() => {
        $("#newsImgBlock" + this.newsItem.nlId).css("height", this.imageHeight + "px");
        if ($("#newsImgBlock" + this.newsItem.nlId + " img").width() < $("#newsImgBlock" + this.newsItem.nlId + " img").height()) {
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("width", "100%");
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("margin-top", -($("#newsImgBlock" + this.newsItem.nlId + " img").height() - this.imageHeight)/2 + "px");
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("display", "inline");
        } else {
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("height", "100%");
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("margin-left", ($("#newsImgBlock" + this.newsItem.nlId).width() - $("#newsImgBlock" + this.newsItem.nlId + " img").width())/2 + "px");
          $("#newsImgBlock" + this.newsItem.nlId + " img").css("display", "inline");
        }
      }, 50);
    }, 100);

    try {
      this.imgSrc = $(this.newsItem.content).find('img')[0].src;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.newsItem.content);
    } catch (e) {
        console.log('Could not find <img>!');
    }
  }
}