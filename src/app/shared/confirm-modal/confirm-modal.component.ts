import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmModalService} from './confirm-modal.service';
import {ConfirmModalDTO} from './dto/confModalDTO';
import {Subscription} from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit, OnDestroy {

  public confirmDTO: ConfirmModalDTO;

  /* Subscription */
  private confirmModalSrvSubscription: Subscription;
  /**/
  public isValidForConfirm: boolean;

  constructor(private confirmModalService: ConfirmModalService) {
    this.confirmDTO = null;
    this.isValidForConfirm = false;
  }

  ngOnInit() {
    this.confirmModalSrvSubscription = this.confirmModalService.startSharedConfirmModalEmitter.subscribe((dto) => {
      if (dto) {
        this.confirmDTO = dto;
        if (this.confirmDTO.isInputRequired) {
          this.isValidForConfirm = false;
        } else {
          this.isValidForConfirm = true; // if input not needed button must be clickable
        }
        this.showModal();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.confirmModalSrvSubscription) { // unsubscribe
      this.confirmModalSrvSubscription.unsubscribe();
    }
  }

  public confirmButtonAction() {
    this.confirmDTO.result = true;
    this.confirmModalService.callbackShadedConfirmModalEmitter.emit(this.confirmDTO); // callback
    this.closeModal();
  }

  private showModal() {
    $('#confirmModalID').modal('show');
  }

  private closeModal() {
    $('#confirmModalID').modal('hide');
  }

  public validate() {
    if (this.confirmDTO.inputContent.length > 10) {
      this.isValidForConfirm = true;
    } else {
      this.isValidForConfirm = false;
    }
  }
}
