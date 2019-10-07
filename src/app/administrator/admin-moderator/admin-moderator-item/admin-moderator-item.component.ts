import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AdminModeratorService} from '../admin-moderator.service';
import {AdmModeratorDTO} from '../dto/admModeratorDTO';
import {Subscription} from 'rxjs';
import {SharedToasterService} from '../../../shared/shared-toaster/shared-toaster.service';
import {SharedToasterDTO} from '../../../shared/shared-toaster/dto/sharedToasterDTO';

declare var $: any;
@Component({
  selector: 'app-admin-moderator-item',
  templateUrl: './admin-moderator-item.component.html',
  styleUrls: ['./admin-moderator-item.component.scss']
})
export class AdminModeratorItemComponent implements OnInit, OnDestroy {

  @Output() moderatorCreated = new EventEmitter();

  public moderatorDTO: AdmModeratorDTO;
  public showErrMsg: boolean;
  public errMsg: string;
  /* subscription*/
  private createModeratorSubscription: Subscription;
  private startCreateModeratorModalSubscription: Subscription;

  constructor(private adminModeratorService: AdminModeratorService, private sharedToasterSer: SharedToasterService) {
    this.moderatorDTO = new AdmModeratorDTO();
    this.showErrMsg = false;
  }

  ngOnInit() {
    this.startCreateModeratorModalSubscription = this.adminModeratorService.startModeratorItemModalEmitter.subscribe(() => {
      this.moderatorDTO = new AdmModeratorDTO();
      this.showModal();
    });
  }

  ngOnDestroy(): void {
    if (this.createModeratorSubscription) {
      this.createModeratorSubscription.unsubscribe();
    }
    if (this.startCreateModeratorModalSubscription) {
      this.startCreateModeratorModalSubscription.unsubscribe();
    }
  }

  /* create moderator */
  public createModerator() {
    this.errMsg = '';
    this.showErrMsg = false;
    // validation
    if (!this.isModeratorCreateValid()) { // not valid
      this.showErrMsg = true;
      return;
    }

    this.createModeratorSubscription = this.adminModeratorService.createModerator(JSON.stringify(this.moderatorDTO)).subscribe(
      (data) => {
        if (data.state === 1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Модератор создан', 'success'));
          this.moderatorCreated.emit(); // reload moderator list
        } else if (data.state === -1) {
          this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'warning'));
        }
      },
      error => {
        this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошла ошибка', 'error'));
      },
      () => {
        this.hideModal();
      }
    );
  }


  private showModal() {
    this.errMsg = '';
    this.showErrMsg = false;
    $('#moderatorItemModalID').modal('show');
  }

  private hideModal() {
    $('#moderatorItemModalID').modal('hide');
  }

  private isModeratorCreateValid(): boolean {
    this.errMsg = 'Поле должно быть заполнено: ';
    if (!this.moderatorDTO) {
      return false;
    }
    if (!this.moderatorDTO.firstName || this.moderatorDTO.firstName.trim().length < 3) {
      this.errMsg += 'Имя и длина должна быть не менее 3 символов';
      return false;
    }
    if (!this.moderatorDTO.lastName || this.moderatorDTO.lastName.trim().length < 3) {
      this.errMsg += 'Фамилия и длина должна быть не менее 3 символов';
      return false;
    }
    // if (!this.moderatorDTO.email || this.moderatorDTO.email.trim().length < 3) {
    //   return false;
    // }
    if (!this.moderatorDTO.phoneNumber || this.moderatorDTO.phoneNumber.trim().length < 3) {
      this.errMsg += 'Контакты и длина должна быть не менее 3 символов';
      return false;
    }
    if (!this.moderatorDTO.login || this.moderatorDTO.login.trim().length < 3) {
      this.errMsg += 'Логин и длина должна быть не менее 3 символов';
      return false;
    }
    if (!this.moderatorDTO.password || this.moderatorDTO.password.trim().length < 3) {
      this.errMsg += 'Пароль и длина должна быть не менее 3 символов';
      return false;
    }
    if (!this.moderatorDTO.repeatPassword || this.moderatorDTO.repeatPassword.trim().length < 3) {
      this.errMsg += 'Повторный пароль и длина должна быть не менее 3 символов';
      return false;
    }
    if (this.moderatorDTO.password !== this.moderatorDTO.repeatPassword) {
      this.errMsg = 'Пароль не совпадает';
      return false;
    }
    return true;
  }

}
