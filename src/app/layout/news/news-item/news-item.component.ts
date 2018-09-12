import { Component, OnInit, Input } from '@angular/core';
import { NewsDto } from '../../../dto/newsDto';
import { Router } from '@angular/router';
import { NewsType } from '../../../util/newsType';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { ProfileService } from '../../../services/profile.service';
declare var $;

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
  providers: [ NewsType, ProfileService ]
})
export class NewsItemComponent implements OnInit {

  @Input() newsItem: NewsDto;
  @Input() index: number;
  public imgSrc: string;
  public imageHeight: number;

  constructor(private router: Router, private newsTypeService: NewsType, private profileService: ProfileService) { }

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
    } catch (e) {
      this.imgSrc = "assets/images/logo.png";
    }
  }

  likeNews() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.profileService.LikeNews(this.newsItem.id).subscribe(
        (data) => {
          if (data.state === 1) {
            this.newsItem.profile.isLiked = true;
            if (!this.newsItem.likedCount) {
              this.newsItem.likedCount = 0;
            }
            this.newsItem.likedCount++;
          } else if (data.state === 2) {
            this.newsItem.profile.isLiked = false;
            this.newsItem.likedCount--;
          }
        },
        error => console.log(error)
      );
    } else {
      $('#toggle-heart-' + this.index).on('click', function(e) {
        return false;
      });
      document.getElementById("logInModal").click();
    }
  }
  
  saveNews() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      if (this.newsItem.profile.isSaved) {
        this.profileService.deleteSavedNews(this.newsItem.nlId).subscribe(
          (data) => {
            if (data.state === 1) {
              this.newsItem.profile.isSaved = false;
            }
          },
          error => console.log(error)
        );
      } else {
        var news = new NewsDto();
        news.nlId = this.newsItem.nlId;
        this.profileService.saveNews(news).subscribe(
          (data) => {
            if (data.state === 1) {
              this.newsItem.profile.isSaved = true;
            }
          },
          error => console.log(error)
        );
      }
    } else {
      document.getElementById("logInModal").click();
    }
  }
}