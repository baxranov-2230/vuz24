import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PublicNewsService } from '../../../services/publicNews.service';
import { LocalStorageSecurity } from '../../../util/localStorageSecurity';
import { CommonKey } from '../../../util/commonKey';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { NewsDto } from '../../../dto/newsDto';
import { CountDto } from '../../../dto/countDto';
import { ProfileService } from '../../../services/profile.service';
import { CommentService } from '../../../services/commentService';
import { CommentDto } from '../../../dto/commentDto';
import { NewsComponent } from '../news.component';
import { ProfileDto } from '../../../dto/profileDto';
declare var $;

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  providers: [ PublicNewsService, ProfileService, CommentService ]
})
export class NewsDetailComponent implements OnDestroy {

  private newsId: number;
  public content: SafeHtml;
  public newsItem: NewsDto;
  public relatedNews: Array<NewsDto>;
  public src: string;
  private navigationSubscription;
  public comment: string = "";
  public commentsList: Array<CommentDto>;
  private from: number;
  private amount: number;
  public imgSrc: string;
  private date = new Date();

  constructor(private commentService: CommentService, private router: Router,
              private profileService: ProfileService, private sanitizer: DomSanitizer,
              private activeRoute: ActivatedRoute, private newsService: PublicNewsService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  private initialiseInvites() {
    this.relatedNews = [];
    this.commentsList = [];
    this.from = 0;
    this.amount = 10;
    this.newsItem = null;
    this.content = null;
    this.newsId = null;
    
    if (LocalStorageSecurity.hasItem(CommonKey.IMG)) {
      // this.imgSrc = LocalStorageSecurity.getItem(CommonKey.IMG);
    }

    this.activeRoute.params.forEach(params => {
      this.newsId = params["id"];
      if (this.newsId) {
        this.getNews();
      }
    });
    this.src = location.href;
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  private getNews() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.newsService.getNewsWithToken(this.newsId).subscribe(
        (data) => {
          if (data.state === 1) {
            this.newsItem = data;
            this.content = this.sanitizer.bypassSecurityTrustHtml(data.content);
            this.getRelatedNewsList();
            this.getCommentsList();
          } else {
            this.router.navigate(['404']);
          }
        },
        (error) => console.log(error)
      );
    } else {
      this.newsService.getNews(this.newsId).subscribe(
        (data) => {
          if (data.state === 1) {
            this.newsItem = data;
            this.content = this.sanitizer.bypassSecurityTrustHtml(data.content);
            this.getRelatedNewsList();
            this.getCommentsList();
          } else {
            this.router.navigate(['404']);
          }
        },
        (error) => console.log(error)
      );
    }
  }

  private getRelatedNewsList() {
    var count = new CountDto();
    count.from = 0;
    count.to = 4;
    count.lang = this.newsItem.lang;
    count.type = this.newsItem.newsType.key;

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.newsService.getNewsListByTypeWithToken(count).subscribe(
        (data) => {
          this.relatedNews = [];
          for (let x of data) {
            if (this.newsItem.id !== x.id) {
              this.relatedNews = this.relatedNews.concat(x);
            }
            try {
              x.imgSrc = $(x.content).find('img')[0].src;
            } catch (e) {
                console.log('Could not find <img>!');
            }
          }
          if (this.relatedNews.length === 4) {
            this.relatedNews.splice(3, 1);
          }
        },
        (error) => console.log(error)
      );
    } else {
      this.newsService.getNewsListByType(count).subscribe(
        (data) => {
          this.relatedNews = [];
          for (let x of data) {
            try {
              x.imgSrc = $(x.content).find('img')[0].src;
              if (this.newsItem.id !== x.id) {
                this.relatedNews = this.relatedNews.concat(x);
              }
            } catch (e) {
                console.log('Could not find <img>!');
            }
          }
          if (this.relatedNews.length === 4) {
            this.relatedNews.splice(3, 1);
          }
        },
        (error) => console.log(error)
      );
    }
  }

  public likeNews () {
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
      $('#toggle-heart').on('click', function(e) {
        return false;
      });
      document.getElementById("logInModal").click();
    }
  }

  public saveNews() {
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

  public goToTop() {
    window.scrollTo(0, 0);
  }

  public createComment() {
    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      var newComment = new CommentDto();
      newComment.newsId = this.newsId;
      newComment.content = this.comment.trim();
      this.commentService.createComment(newComment).subscribe(
        (data) => {
          if (data.state === 1) {
            this.setTimeOfComment(data);
            data.profile = new ProfileDto();
            data.profile.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
            data.profile.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
            data.profile.imgLink = LocalStorageSecurity.getItem(CommonKey.IMG);
            this.commentsList.unshift(data);
            this.comment = "";
          }
        },
        (error) => console.log(error)
      );
    } else {
      document.getElementById("logInModal").click();
    }
  }

  private getCommentsList() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    count.newsId = this.newsId;
    this.from += this.amount;

    if (LocalStorageSecurity.hasItem(CommonKey.TOKEN)) {
      this.commentService.getNewsCommentListWithToken(count).subscribe(
        (data) => {
          for(let x of data) {
            this.setTimeOfComment(x);
          }
          this.commentsList = this.commentsList.concat(data);
          console.log(data);
        },
        (error) => console.log(error)
      );
    } else {
      this.commentService.getNewsCommentList(count).subscribe(
        (data) => {
          for(let x of data) {
            this.setTimeOfComment(x);
          }
          this.commentsList = this.commentsList.concat(data);
          console.log(data);
        },
        (error) => console.log(error)
      );
    }
  }

  private getMonth(num: number) {
    switch (num) {
      case 1:
        return "Yanvar";
      case 2:
        return "Fevral";
      case 3:
        return "Mart";
      case 4:
        return "Aprel";
      case 5:
        return "May";
      case 6:
        return "Iyun";
      case 7:
        return "Iyul";
      case 8:
        return "Avgust";
      case 9:
        return "Sentabr";
      case 10:
        return "Oktabr";
      case 11:
        return "Noyabr";
      case 12:
        return "Dekabr";
      default:
        return "";
    }
  }

  private setTimeOfComment(x: CommentDto) {
    if (parseInt(x.submitDate.split(" ")[0].split("/")[2]) === this.date.getUTCFullYear()) {
      if (parseInt(x.submitDate.split(" ")[0].split("/")[1]) === this.date.getUTCDay()) {
        if (parseInt(x.submitDate.split(" ")[0].split("/")[0]) === this.date.getUTCDate()) {
          x.time = "Bugun " + x.submitDate.split(" ")[1];
        } else if (parseInt(x.submitDate.split(" ")[0].split("/")[0]) + 1 === this.date.getUTCDate()) {
          x.time = "Kecha " + x.submitDate.split(" ")[1];
        } else {
          x.time = x.submitDate.split(" ")[0].split("/")[0] + "-"
               + this.getMonth(parseInt(x.submitDate.split(" ")[0].split("/")[1]));
        }
      } else {
        x.time = x.submitDate.split(" ")[0].split("/")[0] + "-"
               + this.getMonth(parseInt(x.submitDate.split(" ")[0].split("/")[1]));
      }
    } else {
      x.time = this.getMonth(parseInt(x.submitDate.split(" ")[0].split("/")[1])) + ", "
               + x.submitDate.split(" ")[0].split("/")[2];
    }
  }
}