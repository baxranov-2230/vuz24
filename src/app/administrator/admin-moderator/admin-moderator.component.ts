import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminModeratorService} from './admin-moderator.service';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmModeratorDTO} from './dto/admModeratorDTO';
import {ConfirmModalService} from '../../shared/confirm-modal/confirm-modal.service';
import {ConfirmModalDTO} from '../../shared/confirm-modal/dto/confModalDTO';
import {Subscription} from 'rxjs';
import {SharedToasterService} from '../../shared/shared-toaster/shared-toaster.service';
import {SharedToasterDTO} from "../../shared/shared-toaster/dto/sharedToasterDTO";

declare var $: any;

@Component({
  selector: 'app-admin-moderator',
  templateUrl: './admin-moderator.component.html',
  styleUrls: ['./admin-moderator.component.scss'],
  providers: [AdminModeratorService]
})
export class AdminModeratorComponent implements OnInit, OnDestroy {

  public pageFilter: PageFilterDTO; // pagination filter
  public moderatorList: Array<AdmModeratorDTO>;
  public selectedModerator: AdmModeratorDTO;

  /* Subscribes */
  private moderatorListSubscribe: Subscription;
  private confirmMServiceSubscription: Subscription;
  private deleteModalSubscription: Subscription;


  constructor(private moderatorSrv: AdminModeratorService, private sharedConfModalService: ConfirmModalService,
              private sharedToasterSer: SharedToasterService) {
    this.pageFilter = new PageFilterDTO();
    this.pageFilter.from = 0;
    this.pageFilter.to = 100; // no need pagination in moderator!!!

    this.moderatorList = new Array();
    this.selectedModerator = null;
  }

  ngOnInit() {
    this.getModeratorList();

    this.confirmMServiceSubscription = this.sharedConfModalService.callbackShadedConfirmModalEmitter.subscribe((data: ConfirmModalDTO) => {
      if (data.id === 1) { // delete moderator
        this.deleteModeratorServer();
      }
    });
  }

  ngOnDestroy(): void {

    // unsubscribe
    if (this.moderatorListSubscribe) {
      this.moderatorListSubscribe.unsubscribe();
    }
    if (this.confirmMServiceSubscription) {
      this.confirmMServiceSubscription.unsubscribe();
    }
    if (this.deleteModalSubscription) {
      this.deleteModalSubscription.unsubscribe();
    }
  }

  public moderDetailInfo(moder: AdmModeratorDTO) {
    this.selectedModerator = moder;
    $('#admModerDetailModalID').modal('show');
  }

  public deleteModerator(moder: AdmModeratorDTO) {
    this.selectedModerator = moder;
    const dto = new ConfirmModalDTO('Внимание', 'Вы действительно хотите удалить?', 1);
    this.sharedConfModalService.startSharedConfirmModalEmitter.emit(dto);
  }

  public reloadModeratorList() {
    this.getModeratorList();
  }

  /* Get moderator list */
  private getModeratorList() {
    this.moderatorListSubscribe = this.moderatorSrv.moderatorList(this.pageFilter).subscribe(
      (data) => {
        if (data) {
          this.moderatorList = data;
        }
      },
      error => console.log(error)
    );
  }

  /* start create moderator modal */
  public crateModerator() {
    this.moderatorSrv.startModeratorItemModalEmitter.emit();
  }

  /* delete moderator */
  public deleteModeratorServer() {
    if (this.selectedModerator) {
      this.deleteModalSubscription = this.moderatorSrv.deleteModerator(this.selectedModerator.id.toString()).subscribe(
        (data) => {
          if (data.state === 1) {
            this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Модератор удален', 'success'));
            this.getModeratorList();
          } else if (data.state === -1) {
            this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошло ошибка', 'warning'));
          }
        },
        (error) => {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Error', 'Произошла ошибка', 'error'));
        }
      );
    }
  }

}
