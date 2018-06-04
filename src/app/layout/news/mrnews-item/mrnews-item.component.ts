import { Component, OnInit, Input } from '@angular/core';
import { NewsDto } from '../../../dto/newsDto';
import { NewsType } from '../../../util/newsType';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { ProfileService } from '../../../services/profile.service';
declare var $;

@Component({
  selector: 'app-mrnews-item',
  templateUrl: './mrnews-item.component.html',
  styleUrls: ['./mrnews-item.component.scss'],
  providers: [NewsType, ProfileService]
})
export class MrnewsItemComponent implements OnInit {

  @Input() newsItem: NewsDto;
  @Input() index: number;
  public imgSrc: string;
  public isLiked: boolean;

  constructor(private newsTypeService: NewsType, private profileService: ProfileService) { }

  ngOnInit() {
    if (this.newsItem) {
      this.newsItem.newsType.name = this.newsTypeService.getNewsTypeName(this.newsItem.newsType.key);
    }
  }

  public getMyStyle() {
    try {
      this.imgSrc = $(this.newsItem.content).find('img')[0].src;
      let myStyles = {
        'background-image': 'url(' + this.imgSrc + ')'
      };
      return myStyles;
    } catch (e) {
        this.getMyStyle();
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
      $('#mr-toggle-heart-' + this.index).on('click', function(e) {
        return false;
      });
      document.getElementById("logInModal").click();
    }
  }

  saveNews() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      var news = new NewsDto();
      news.nlId = this.newsItem.nlId;
      this.profileService.saveNews(news).subscribe(
        (data) => {
          console.log(data);
        },
        error => console.log(error)
      );
    } else {
      document.getElementById("logInModal").click();
    }
  }
}