import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralURL} from '../../../util/generalUrl';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AdminNewsCreateService} from './admin-news-create.service';
import {SharedToasterService} from '../../../shared/shared-toaster/shared-toaster.service';
import {NewsLangService} from '../../../services/news-lang.service';
import {NewsTypeService} from '../../../services/news-type.service';
import {LangDto} from '../../../dto/langDto';
import {NewsTypeDto} from '../../../dto/newsTypeDto';
import {NewsDto} from '../../../dto/newsDto';
import {SharedToasterDTO} from '../../../shared/shared-toaster/dto/sharedToasterDTO';
import {LocalStorageSecurity} from "../../../util/localStorageSecurity";
import {CommonKey} from "../../../util/commonKey";

declare var $: any;

@Component({
  selector: 'app-admin-news-create',
  templateUrl: './admin-news-create.component.html',
  styleUrls: ['./admin-news-create.component.scss'],
  providers: [AdminNewsCreateService]
})
export class AdminNewsCreateComponent implements OnInit, OnDestroy {
  /** URL ACTION TYPE :
   * 0 - create
   * 1- update
   * 2 - create in new_lang (translate)
   **/
  public urlAction: number;
  /**/
  public langList: Array<LangDto>;
  public newsTypesList: Array<NewsTypeDto>;
  /**/
  public selectedNewsLangKey: string; // selectedNewsKey
  public selectedNewsTypeId: number; // selectedNewsType
  public selectedNewsImportant: boolean;
  public newsTitle: string;
  public newsSubContent: string;
  /**/
  public isReady: boolean;
  /* Subscription */
  public saveNewsSubscription: Subscription;
  /**/
  public newsId: number; // it si newsID not nlId
  public nlId: number; // it is newsLangId (nlId)

  constructor(private router: Router, private activeRoute: ActivatedRoute, private admNewsCreateSrv: AdminNewsCreateService, private newsLangSrv: NewsLangService,
              private newsTypeSrv: NewsTypeService, private sharedToasterSer: SharedToasterService) {
    this.langList = [];
    this.newsTypesList = [];
    this.urlAction = -1;
    this.isReady = false;
  }

  ngOnInit() {
    $('#admNewsEditor').trumbowyg({
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
          serverPath: GeneralURL.imageURL.concat('createTrum').toString(),
          fileFieldName: 'file',
        }
      }
    });

    this.activeRoute.params.forEach(params => {
      if (params['action']) {
        this.urlAction = parseInt(params['action'], null);
      }
    });

    if (this.urlAction === 0) { // create
      this.inputDefValue();
      this.init();
    } else if (this.urlAction === 1) { // update
      const data = LocalStorageSecurity.getItem(CommonKey.ADM_NEWS);
      if (data) {
        const obj = JSON.parse(data);
        const detail = JSON.parse(obj['detail']);

        this.newsId = obj['news_id'];
        this.selectedNewsLangKey = detail['lang'];
        this.selectedNewsTypeId = obj['news_type_id'];
        this.selectedNewsImportant = detail['important'];
        this.newsTitle = detail['title'];
        this.newsSubContent = detail['sub_content'];
        this.nlId = detail['news_lang_id'];
        $('#admNewsEditor').trumbowyg('html', detail['content']);

        this.init();
      }

    } else if (this.urlAction === 2) { // create translater
      const data = LocalStorageSecurity.getItem(CommonKey.ADM_NEWS);
      if (data) {
        const obj = JSON.parse(data);
        this.newsId = obj['news_id'];
        this.selectedNewsLangKey = obj['to_lang'];
        this.selectedNewsTypeId = obj['news_type_id'];

        const detail = JSON.parse(obj['detail']);

        this.selectedNewsImportant = detail['important'];
        this.newsTitle = detail['title'];
        this.newsSubContent = detail['sub_content'];
        $('#admNewsEditor').trumbowyg('html', detail['content']);

        this.init();
      }
    } else {
      this.router.navigate(['administrator']);
    }

  }

  public init() {
    this.getLanguages();
    this.getNewsTypeList();
    this.checkNews();
  }

  ngOnDestroy(): void {
    if (this.saveNewsSubscription) {
      this.saveNewsSubscription.unsubscribe();
    }
  }

  private inputDefValue() {
    this.selectedNewsLangKey = 'def';
    this.selectedNewsTypeId = 0;
    this.selectedNewsImportant = false;
    this.newsTitle = '';
    this.newsSubContent = '';
    this.isReady = false;
  }

  private getLanguages() {
    this.newsLangSrv.getLanguages().subscribe(
      (data) => {
        this.langList = data;
      },
      error => console.log(error)
    );
  }

  private getNewsTypeList() {
    this.newsTypeSrv.getNewsTypeList('uzl').subscribe(
      (data) => {
        this.newsTypesList = data;
      },
      error => console.log(error)
    );
  }

  public checkNews() {
    const content = $('#admNewsEditor').trumbowyg('html');

    if (this.selectedNewsLangKey !== 'def' && this.selectedNewsTypeId !== 0 && this.newsTitle.length > 10 &&
      this.newsSubContent.length > 10 && content.length > 20) {
      this.isReady = true;
    } else {
      this.isReady = false;
    }
  }

  public createNews() {
    this.checkNews();
    if (!this.isReady) {
      return;
    }

    if (this.urlAction !== 0) {
      return;
    }
    const content = $('#admNewsEditor').trumbowyg('html');

    const obj = {
      'lang': this.selectedNewsLangKey,
      'title': this.newsTitle,
      'content': content,
      'subContent': this.newsSubContent,
      'important': this.selectedNewsImportant,
      'newsType': {
        'id': this.selectedNewsTypeId
      }
    };

    this.admNewsCreateSrv.createNews(JSON.stringify(obj)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость создан', 'success'));
          setTimeout(() => {
            this.router.navigate(['administrator']);
          }, 100);
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public updateNews() {
    this.checkNews();

    if (!this.isReady || this.urlAction !== 1 || !this.newsId || !this.nlId) {
      return;
    }

    const content = $('#admNewsEditor').trumbowyg('html');

    const obj = {
      'id': this.newsId,
      'nlId': this.nlId,
      'lang': this.selectedNewsLangKey,
      'title': this.newsTitle,
      'content': content,
      'subContent': this.newsSubContent,
      'important': this.selectedNewsImportant
    };

    this.admNewsCreateSrv.updateNews(JSON.stringify(obj)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Перевод создан', 'success'));
          setTimeout(() => {
            this.router.navigate(['administrator']);
          }, 100);
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public createTranslation() {
    this.checkNews();

    if (!this.isReady || this.urlAction !== 2 || !this.newsId) {
      return;
    }

    const content = $('#admNewsEditor').trumbowyg('html');

    const obj = {
      'id': this.newsId,
      'lang': this.selectedNewsLangKey,
      'title': this.newsTitle,
      'content': content,
      'subContent': this.newsSubContent,
      'important': this.selectedNewsImportant
    };

    this.admNewsCreateSrv.createTranslation(JSON.stringify(obj)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Перевод создан', 'success'));
          setTimeout(() => {
            this.router.navigate(['administrator']);
          }, 100);
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }


  public isNewsTypeDisabled() {
    if (this.urlAction === 2 || this.urlAction === 1) {
      return true;
    }
    return null;
  }
}
