import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminCommentService} from './admin-comment.service';
import {Subscription} from 'rxjs';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {SharedToasterService} from '../../shared/shared-toaster/shared-toaster.service';
import {ConfirmModalService} from '../../shared/confirm-modal/confirm-modal.service';
import {ConfirmModalDTO} from '../../shared/confirm-modal/dto/confModalDTO';
import {SharedToasterDTO} from '../../shared/shared-toaster/dto/sharedToasterDTO';
import {AdmCommentDTO} from './dto/admCommentDTO';

declare var $: any;

@Component({
  selector: 'app-admin-comment',
  templateUrl: './admin-comment.component.html',
  styleUrls: ['./admin-comment.component.scss'],
  providers: [AdminCommentService]
})
export class AdminCommentComponent implements OnInit, OnDestroy {


  public commentList: Array<AdmCommentDTO>;
  public selectedCommentDTO: AdmCommentDTO;
  /* Table */
  public pageFilter: PageFilterDTO; // pagination filter
  public totalCount = 0; // total count of items
  public currentPage = 1; // current page
  public totalPageCount = 1; // total pages count
  public itemsPerPage = 15; // how many items on page
  public pageCountArray = [];
  /* Subsribtion */
  private confirmMServiceSubscription: Subscription;
  private commentListSubscription: Subscription;
  private deleteCommentSubscriotion: Subscription;

  constructor(private adminCommentSrv: AdminCommentService, private sharedConfModalService: ConfirmModalService,
              private sharedToasterSer: SharedToasterService) {
    this.pageFilter = new PageFilterDTO();
    this.selectedCommentDTO = null;
    this.commentList = [];
  }

  ngOnInit() {
    this.getCommentList();

    this.confirmMServiceSubscription = this.sharedConfModalService.callbackShadedConfirmModalEmitter.subscribe((data: ConfirmModalDTO) => {
      if (data.id === 1) { // delete moderator
        this.deleteCommentSrv();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.confirmMServiceSubscription) {
      this.confirmMServiceSubscription.unsubscribe();
    }
    if (this.commentListSubscription) {
      this.commentListSubscription.unsubscribe();
    }
    if (this.deleteCommentSubscriotion) {
      this.deleteCommentSubscriotion.unsubscribe();
    }
  }

  private getCommentList() {
    this.pageFilter.from = (this.currentPage - 1) * this.itemsPerPage;
    this.pageFilter.to = this.itemsPerPage;
    this.commentListSubscription = this.adminCommentSrv.getCommentList(this.pageFilter).subscribe(
      (data) => {
        if (data) {
          this.commentList = data.data;
          this.totalCount = data.totalCount;
          this.calculatePagination();
        }
      },
      error => console.log(error)
    );
  }

  public commentInfo(comment: AdmCommentDTO) {
    this.selectedCommentDTO = comment;
    $('#commentInfoModalID').modal('show');
  }

  public deleteComment(comment: AdmCommentDTO) {
    this.selectedCommentDTO = comment;
    const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите удалить комментарий ?', 1);
    this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
  }

  private deleteCommentSrv() {
    if (this.selectedCommentDTO) {
      this.deleteCommentSubscriotion = this.adminCommentSrv.deleteComment(this.selectedCommentDTO.id.toString()).subscribe(
        (data) => {
          if (data.state === 1) {
            this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Комментарий удален', 'success'));
            if (this.commentList.length === 1 && this.currentPage > 1) {
              this.currentPage -= 1;
            }
            this.getCommentList();
          } else if (data.state === -1) {
            this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошло ошибка', 'warning'));
          }
        },
        error => console.log(error)
      );
    }
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
      this.getCommentList();
    }
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.getCommentList();
  }

  public goToNextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
      this.getCommentList();
    }
  }

}
