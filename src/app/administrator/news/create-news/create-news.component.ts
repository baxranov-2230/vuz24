import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { GeneralURL } from '../../../util/generalUrl';
import { LangDto } from '../../../dto/langDto';
import { NewsDto } from '../../../dto/newsDto';
import { NewsTypeDto } from '../../../dto/newsTypeDto';
import { Router } from '@angular/router';
import { ImageDto } from '../../../dto/imageDto';
declare var $;

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss'],
  providers: [NewsService]
})

export class CreateNewsComponent implements OnInit {

  public langs: Array<LangDto>;
  public newsTypes: Array<NewsTypeDto>;
  public subContent: string = "";
  public isReady: Boolean = false;
  private imageDto: ImageDto;

  constructor(private newsService: NewsService, private router: Router) {
    this.imageDto = new ImageDto();
  }

  ngOnInit() {
    $('#editor').trumbowyg({
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
    
    this.getLanguages();
    this.getNewsTypeList();
  }

  private getLanguages() {
    this.newsService.getLanguages().subscribe(
      (data) => {
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
        (<HTMLInputElement>document.getElementById('sel2')).value !== "Yangilik mavzulari:" &&
        (<HTMLInputElement>document.getElementById('title')).value.length > 0 &&
        this.subContent.length > 0) {
      this.isReady = true;
    }
  }

  public saveNews() {
    var news = new NewsDto();
    news.newsType = new NewsTypeDto();

    news.important = (<HTMLInputElement>document.getElementById('sel3')).checked;
    news.lang = (<HTMLInputElement>document.getElementById('sel1')).value;
    news.newsType.id = parseInt((<HTMLInputElement>document.getElementById('sel2')).value);
    news.title = (<HTMLInputElement>document.getElementById('title')).value;
    news.subContent = this.subContent;
    news.content = $('#editor').trumbowyg('html');

    this.newsService.createNews(news).subscribe(
      (data) => {
        if (data.state === 1) {
          setTimeout(() => {
            this.router.navigate(["moderator/all-news"]);
          }, 300);
        }
      },
      error => console.log(error)
    );
  }
}