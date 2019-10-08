import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminNewsNotPubService} from './admin-news-not-pub.service';
import {Subscription} from 'rxjs';
import {AdmNewsNotPubDTO} from './dto/admNewsNotPubDTO';
import {DomSanitizer} from '@angular/platform-browser';
import {ConfirmModalService} from '../../../shared/confirm-modal/confirm-modal.service';
import {SharedToasterService} from '../../../shared/shared-toaster/shared-toaster.service';
import {ConfirmModalDTO} from '../../../shared/confirm-modal/dto/confModalDTO';
import {SharedToasterDTO} from '../../../shared/shared-toaster/dto/sharedToasterDTO';
import {LocalStorageSecurity} from "../../../util/localStorageSecurity";
import {CommonKey} from "../../../util/commonKey";
import {Router} from "@angular/router";

declare var $: any;
@Component({
  selector: 'app-admin-news-not-pub',
  templateUrl: './admin-news-not-pub.component.html',
  styleUrls: ['./admin-news-not-pub.component.scss'],
  providers: [AdminNewsNotPubService]
})
export class AdminNewsNotPubComponent implements OnInit, OnDestroy {


  public notPubNewsList: Array<AdmNewsNotPubDTO>;
  public selectedNewsDTO: AdmNewsNotPubDTO;
  /* Subscription */
  public confirmMServiceSubscription: Subscription;

  public profileRole: string;

  constructor(private admNewsNotPubSrv: AdminNewsNotPubService, private sanitizer: DomSanitizer, private router: Router,
              private sharedConfModalService: ConfirmModalService, private sharedToasterSer: SharedToasterService) {
    this.notPubNewsList = [];
    this.selectedNewsDTO = null;
    this.profileRole = '';
  }

  ngOnInit() {
    this.confirmMServiceSubscription = this.sharedConfModalService.callbackShadedConfirmModalEmitter.subscribe((data: ConfirmModalDTO) => {
      if (data.id === 1) { // delete news
        this.deleteNewsSrv();
      } else if (data.id === 2) { // publish news
        this.publishNewsSrv();
      } else if (data.id === 3) { // reject news
        this.rejectNewsSrv(data.inputContent);
      }
    });

    this.profileRole = LocalStorageSecurity.getItem(CommonKey.ROLE);

    this.getNotPublishedNewsList();
  }

  ngOnDestroy(): void {
    if (this.confirmMServiceSubscription) {
      this.confirmMServiceSubscription.unsubscribe();
    }
  }

  private getNotPublishedNewsList() {
    const obj = {
      from: 0,
      to: 25
    };

    this.admNewsNotPubSrv.getNotPublishedNewsList(JSON.stringify(obj)).subscribe(
      (data) => {
        this.notPubNewsList = data;
      },
      error => console.log(error)
    );
  }

  public onPublish(e) {
    this.getNotPublishedNewsList();
  }

  public getNewsImage(item: AdmNewsNotPubDTO): string {
    try {
      const content = item.content.toString();
      const regexTest = /<img.*?>/g;

      
      
      if (item.content && regexTest.exec(content)) {
        console.log(item);
        return $('<p>' + item.content + '</p>').find('img')[0].src; // the best way to extract src
      } else {
        return 'assets/images/logo.png';
      }
    } catch (e) {
      return 'assets/images/logo.png';
    }
  }

  public openNewsDetailModal(item: AdmNewsNotPubDTO) {
    this.selectedNewsDTO = item;
    $('#notPubNewsModalID').modal('show');
  }

  public deleteNews() {
    $('#notPubNewsModalID').modal('hide');
    setTimeout(() => {
      const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите удалить?', 1);
      this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
    }, 200);
  }

  private deleteNewsSrv() {
    if (!this.selectedNewsDTO) {
      return;
    }

    this.admNewsNotPubSrv.deleteNews(this.selectedNewsDTO.nlId.toString()).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость удалень', 'success'));
          this.getNotPublishedNewsList();
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public publishNews() {
    $('#notPubNewsModalID').modal('hide');
    setTimeout(() => {
      const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите опубликовать новость ?', 2);
      this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
    }, 200);
  }

  private publishNewsSrv() {
    if (!this.selectedNewsDTO) {
      return;
    }

    this.admNewsNotPubSrv.publishNews(this.selectedNewsDTO.nlId.toString()).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость успешно опубликован', 'success'));
          this.getNotPublishedNewsList();
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public rejectNews() {
    $('#notPubNewsModalID').modal('hide');
    setTimeout(() => {
      const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите отклонять новость?', 3);
      dto.isInputRequired = true;
      this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
    }, 200);
  }

  private rejectNewsSrv(reason: string) {
    if (!this.selectedNewsDTO) {
      return;
    }

    const id = this.selectedNewsDTO.nlId.toString();
    const obj = {'reason': reason};
    this.admNewsNotPubSrv.disableNews(id, JSON.stringify(obj)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость отклонён', 'success'));
          this.getNotPublishedNewsList();
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
    if (!this.selectedNewsDTO) {
      return;
    }

    $('#notPubNewsModalID').modal('hide');

    const detail = {
      lang: this.selectedNewsDTO.lang,
      important: false,
      title: this.selectedNewsDTO.title,
      sub_content: this.selectedNewsDTO.subContent,
      news_lang_id: this.selectedNewsDTO.nlId,
      content: this.selectedNewsDTO.content
    };

    const obj = {
      'news_id': this.selectedNewsDTO.id,
      'news_type_id': this.selectedNewsDTO.newsType.id,
      'detail': JSON.stringify(detail)
    };

    LocalStorageSecurity.setItem(CommonKey.ADM_NEWS, JSON.stringify(obj));
    setTimeout(() => {
      this.router.navigate(['administrator/news-create/1']);
    }, 350);
  }


  public getAccess(code: number) {
    if (this.profileRole === 'moderator') {  /* moderator */
      if (code === 2) {
        return true;
      }
    } else if (this.profileRole === 'admin') {   /* admin */
      return true;
    }

    return false;
  }


  public getContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.selectedNewsDTO.content);
  }

}
