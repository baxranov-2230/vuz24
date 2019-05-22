import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { GeneralURL } from '../../../util/generalUrl';
import { LangDto } from '../../../dto/langDto';
import { NewsDto } from '../../../dto/newsDto';
import { NewsTypeDto } from '../../../dto/newsTypeDto';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageDto } from '../../../dto/imageDto';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CountDto } from '../../../dto/countDto';
declare var $;

@Component({
  selector: 'app-translate-news',
  templateUrl: './translate-news.component.html',
  styleUrls: ['./translate-news.component.scss'],
  providers: [NewsService]
})
export class TranslateNewsComponent implements OnInit {

  public langs: Array<LangDto>;
  public newsTypes: Array<NewsTypeDto>;
  public subContent: String = "";
  public isReady: Boolean = false;
  private imageDto: ImageDto;
  public content: SafeHtml;
  public newsItem: NewsDto;

  constructor(private newsService: NewsService, private sanitizer: DomSanitizer, private router: Router, private activeRoute: ActivatedRoute) {
    this.imageDto = new ImageDto();
  }

  ngOnInit() {
    $('#editor2').trumbowyg({
      removeformatPasted: true,
      svgPath: 'assets/images/icons.svg',
      btnsDef: {
        image: {
            dropdown: ['insertImage', 'upload'],
            ico: 'insertImage'
        }
      },
      btns: [
          ['viewHTML'],
          ['strong', 'em', 'del'],
          ['superscript', 'subscript'],
          ['foreColor', 'backColor'],
          ['fontfamily'],
          ['fontsize'],
          ['link'],
          ['image'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['unorderedList', 'orderedList'],
          ['horizontalRule'],
          ['removeformat'],
          ['fullscreen']
      ],
      plugins: {
          upload: {
              serverPath: GeneralURL.imageURL.concat('create').toString(),
              fileFieldName: 'file',
          }
      }
    });

    this.activeRoute.params.forEach(params => {
      if (params["lang"]) {
        this.getLanguages(params["lang"]);
        if (params["id"]) {
          this.getNews(params["lang"], params["id"])
        }
      }
    });
    
    this.getNewsTypeList();
  }

  private getNews(lang: string, id: number) {
    var count = new CountDto();
    count.lang = lang;
    count.pId = id;
    this.newsService.getNewsWithToken(count).subscribe(
      (data) => {
        if (data.state === 1) {
          this.newsItem = data;
          this.content = this.sanitizer.bypassSecurityTrustHtml(data.content);
        } else {
          this.router.navigate(['404']);
        }
      },
      (error) => console.log(error)
    );
  }

  private getLanguages(lang: string) {
    this.newsService.getLanguages().subscribe(
      (data) => {
        if (lang === "uzl") {
          data.shift()
        } else if (lang === "uzk") {
          data.splice(1, 1)
        } else if (lang === "ru") {
          data.splice(2, 1)
        } else if (lang === "en") {
          data.pop()
        }
        this.langs = data;
      },
      error => console.log(error)
    );
  }

  private getNewsTypeList() {
    this.newsService.getNewsTypeList("uzl").subscribe(
      (data) => {
        this.newsTypes = data;
      },
      error => console.log(error)
    );
  }

  public checkNews() {
    if ((<HTMLInputElement>document.getElementById('sel1')).value !== "Tillar:" &&
        (<HTMLInputElement>document.getElementById('title')).value.length > 0 &&
        this.subContent.length > 0) {
      this.isReady = true;
    }
  }

  public saveNews() {
    var news = new NewsDto();

    news.NEWS_ID = this.newsItem.id;
    news.id = this.newsItem.id;
    news.important = (<HTMLInputElement>document.getElementById('sel3')).checked;
    news.lang = (<HTMLInputElement>document.getElementById('sel1')).value;
    news.title = (<HTMLInputElement>document.getElementById('title')).value;
    news.subContent = this.subContent;
    news.content = $('#editor2').trumbowyg('html');
    this.newsService.addNewsTranslation(news).subscribe(
      (data) => {
        if (data.state === 1) {
          setTimeout(() => {
            this.router.navigate(["moderator/not-published-news"]);
          }, 300);
        }
        
      },
      error => console.log(error)
    );
  }
}