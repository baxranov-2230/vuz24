import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminNewsListService} from './admin-news-list.service';
import {PageFilterDTO} from '../../../dto/pageFilterDTO';
import {AdmNewsTreeDTO} from './dto/admNewsTreeDTO';
import {Subscription} from 'rxjs';
import {LocalStorageSecurity} from '../../../util/localStorageSecurity';
import {CommonKey} from '../../../util/commonKey';
import {Router} from '@angular/router';
import {AdmNewsItemDTO} from './dto/admNewsItemDTO';
import {SharedToasterDTO} from '../../../shared/shared-toaster/dto/sharedToasterDTO';
import {SharedToasterService} from '../../../shared/shared-toaster/shared-toaster.service';
import {ConfirmModalDTO} from '../../../shared/confirm-modal/dto/confModalDTO';
import {ConfirmModalService} from '../../../shared/confirm-modal/confirm-modal.service';

declare var $: any;

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.component.html',
  styleUrls: ['./admin-news-list.component.scss'],
  providers: [AdminNewsListService]
})
export class AdminNewsListComponent implements OnInit, OnDestroy {

  public newsTreeList: Array<AdmNewsTreeDTO>;
  /* Table */
  public pageFilter: PageFilterDTO; // pagination filter
  public totalCount = 0; // total count of items
  public currentPage = 1; // current page
  public totalPageCount = 1; // total pages count
  public itemsPerPage = 15; // how many items on page
  public pageCountArray = [];
  /* Subscription */
  public newsListSubscription: Subscription;
  public confirmMServiceSubscription: Subscription;
  /**/
  public selectedNewsTreeDTO: AdmNewsTreeDTO;
  public selectedNewsItemDTO: AdmNewsItemDTO;

  public userRole: string;

  constructor(private admNewsListService: AdminNewsListService, private router: Router,
              private sharedConfModalService: ConfirmModalService, private sharedToasterSer: SharedToasterService) {
    this.pageFilter = new PageFilterDTO();
    this.selectedNewsTreeDTO = null;
    this.userRole = '';

    this.userRole = LocalStorageSecurity.getItem(CommonKey.ROLE);
  }

  ngOnInit() {

    this.confirmMServiceSubscription = this.sharedConfModalService.callbackShadedConfirmModalEmitter.subscribe((data: ConfirmModalDTO) => {
      if (data.id === 1) { // delete news
        this.deleteSelectedNewsSrv();
      } else if (data.id === 2) { // delete news
        this.cancelPublicationSrv(data.inputContent);
      }
    });

    this.getNewsTreeList();
  }

  ngOnDestroy(): void {
    if (this.newsListSubscription) {
      this.newsListSubscription.unsubscribe();
    }
    if (this.confirmMServiceSubscription) {
      this.confirmMServiceSubscription.unsubscribe();
    }
  }

  private getNewsTreeList() {
    this.pageFilter.from = (this.currentPage - 1) * this.itemsPerPage;
    this.pageFilter.to = this.itemsPerPage;

    this.newsListSubscription = this.admNewsListService.getNewsList(this.pageFilter).subscribe(
      (data) => {
        if (data) {
          this.newsTreeList = data.data;
          this.totalCount = data.totalCount;

          this.newsTreeList.forEach(function (item) {
            if (item.uzl) {
              item.uzlDTO = JSON.parse(item.uzl);
            }
            if (item.uzk) {
              item.uzkDTO = JSON.parse(item.uzk);
            }
            if (item.ru) {
              item.ruDTO = JSON.parse(item.ru);
            }
            if (item.en) {
              item.enDTO = JSON.parse(item.en);
            }
          });

          this.calculatePagination();
        }
      },
      error => console.log(error)
    );
  }

  public getDateFormat(date: string): string {
    if (!date) {
      return '';
    }
    return date.replace('T', ' ').slice(0, 19);
  }

  public openNewsSettingsModal(newsTreeDto: AdmNewsTreeDTO, newsLangDTO: AdmNewsItemDTO) {
    this.selectedNewsTreeDTO = newsTreeDto;
    this.selectedNewsItemDTO = newsLangDTO;

    $('#admNewsSettingsModalID').modal('show');
  }

  public createNewsTranslate(newsDto: AdmNewsTreeDTO, langKey: string) {
    const obj = {
      'news_id': newsDto.news_id,
      'news_type_id': newsDto.news_type_id,
      'to_lang': langKey,
      'detail': newsDto.uzl ? newsDto.uzl : ( newsDto.uzk ? newsDto.uzk : (newsDto.ru ? newsDto.ru : newsDto.en))
    };
    LocalStorageSecurity.setItem(CommonKey.ADM_NEWS, JSON.stringify(obj));
    setTimeout(() => {
      this.router.navigate(['administrator/news-create/2']);
    }, 100);
  }

  public deleteSelectedNews() {
    if (!this.selectedNewsItemDTO) {
      return;
    }
    $('#admNewsSettingsModalID').modal('hide');
    setTimeout(() => {
      const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите удалить?', 1);
      this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
    }, 200);

  }

  private deleteSelectedNewsSrv() {
    if (!this.selectedNewsItemDTO) {
      return;
    }

    this.admNewsListService.deleteNews(this.selectedNewsItemDTO.news_lang_id.toString()).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость удалень', 'success'));
          this.getNewsTreeList();
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public updateSelectedNews() {
    if (!this.selectedNewsTreeDTO || !this.selectedNewsItemDTO) {
      return;
    }

    $('#admNewsSettingsModalID').modal('hide');

    // const newsDto = this.selectedNewsTreeDTO;
    const obj = {
      'news_id': this.selectedNewsTreeDTO.news_id,
      'news_type_id': this.selectedNewsTreeDTO.news_type_id,
      'detail': JSON.stringify(this.selectedNewsItemDTO)
    };

    LocalStorageSecurity.setItem(CommonKey.ADM_NEWS, JSON.stringify(obj));
    setTimeout(() => {
      this.router.navigate(['administrator/news-create/1']);
    }, 350);
  }

  public cancelPublication() {
    if (!this.selectedNewsItemDTO) {
      return;
    }
    $('#admNewsSettingsModalID').modal('hide');
    setTimeout(() => {
      const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите отменить публикацию?', 2);
      dto.isInputRequired = true;
      this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
    }, 200);
  }

  public cancelPublicationSrv(reason: string) {
    if (!this.selectedNewsItemDTO || !reason) {
      return;
    }
    const id = this.selectedNewsItemDTO.news_lang_id.toString();
    const obj = {'reason': reason};
    this.admNewsListService.desableNews(id, JSON.stringify(obj)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Публикацию отменено', 'success'));
          this.getNewsTreeList();
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      }
    );
  }

  public getAccess(code: number): boolean {
    if (this.userRole === 'moderator') {  /* moderator */
      if (code === 1) {
        return true;
      }
    } else if (this.userRole === 'admin') {   /* admin */
      return true;
    }

    return false;
  }

  /* Pagination methods */
  public calculatePagination() {
    this.pageCountArray = [];
    this.totalPageCount = Math.ceil(this.totalCount / this.itemsPerPage);
    for (let i = 1; i <= this.totalPageCount; i++) {
      if (this.currentPage === i ||
        i - 1 === this.currentPage ||
        i - 2 === this.currentPage ||
        i + 1 === this.currentPage ||
        i + 2 === this.currentPage) {
        this.pageCountArray.push(i);
      }
    }
  }

  public goToPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getNewsTreeList();
    }
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.getNewsTreeList();
  }

  public goToNextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
      this.getNewsTreeList();
    }
  }
}
