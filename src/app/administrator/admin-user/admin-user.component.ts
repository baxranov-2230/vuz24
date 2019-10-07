import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminUserService} from './admin-user.service';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmProfileDTO} from './dto/admProfileDTO';
import {ConfirmModalDTO} from "../../shared/confirm-modal/dto/confModalDTO";
import {ConfirmModalService} from "../../shared/confirm-modal/confirm-modal.service";
import {SharedToasterService} from "../../shared/shared-toaster/shared-toaster.service";
import {SharedToasterDTO} from "../../shared/shared-toaster/dto/sharedToasterDTO";

declare var $: any;

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  providers: [AdminUserService]
})
export class AdminUserComponent implements OnInit, OnDestroy {

  public profileDTOList: Array<AdmProfileDTO>;
  public selectedProfileDTO: AdmProfileDTO;
  /* Table */
  public pageFilter: PageFilterDTO; // pagination filter
  public totalCount = 0; // total count of items
  public currentPage = 1; // current page
  public totalPageCount = 1; // total pages count
  public itemsPerPage = 15; // how many items on page
  public pageCountArray = [];

  /* Subscription */
  public userListSubscription: Subscription;
  public userDeleteSubscription: Subscription;
  public confirmMServiceSubscription: Subscription;

  constructor(private adminUserSrv: AdminUserService, private sharedConfModalService: ConfirmModalService,
              private sharedToasterSer: SharedToasterService) {
    this.pageFilter = new PageFilterDTO();
    this.selectedProfileDTO = null;
    this.profileDTOList = [];
  }

  ngOnInit() {

    this.confirmMServiceSubscription = this.sharedConfModalService.callbackShadedConfirmModalEmitter.subscribe((data: ConfirmModalDTO) => {
      if (data.id === 1) { // delete user
        this.deleteProfileSrv();
      }
    });

    this.getUserList();
  }

  ngOnDestroy(): void {
    if (this.userListSubscription) {
      this.userListSubscription.unsubscribe();
    }
    if (this.userDeleteSubscription) {
      this.userDeleteSubscription.unsubscribe();
    }
    if (this.confirmMServiceSubscription) {
      this.confirmMServiceSubscription.unsubscribe();
    }
  }

  private getUserList() {
    this.pageFilter.from = (this.currentPage - 1) * this.itemsPerPage;
    this.pageFilter.to = this.itemsPerPage;

    this.userListSubscription = this.adminUserSrv.getUserList(this.pageFilter).subscribe(
      (data) => {
        if (data) {
          this.totalCount = data.totalCount;
          this.profileDTOList = data.data;
          this.calculatePagination();
        }
      },
      error => console.log(error)
    );
  }

  public profileInfo(dto: AdmProfileDTO) {
    this.selectedProfileDTO = dto;
    $('#profileInfoModalID').modal('show');
  }

  public deleteProfile(profile: AdmProfileDTO) {
    this.selectedProfileDTO = profile;
    const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите удалить Пользователя ?', 1);
    this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
  }

  public deleteProfileSrv() {
    if (this.selectedProfileDTO) {
      this.userDeleteSubscription = this.adminUserSrv.deleteUser(this.selectedProfileDTO.id.toString()).subscribe(
        (data) => {
          if (data.state === 1) {
            this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Пользователь удален', 'success'));
            if (this.profileDTOList.length === 1 && this.currentPage > 1) {
              this.currentPage -= 1;
            }
            this.getUserList();
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
      this.getUserList();
    }
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.getUserList();
  }

  public goToNextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
      this.getUserList();
    }
  }

}
