import {EventEmitter, Injectable} from '@angular/core';
import {ConfirmModalDTO} from './dto/confModalDTO';

@Injectable()
export class ConfirmModalService {

  startSharedConfirmModalEmitter = new EventEmitter<ConfirmModalDTO>();
  callbackShadedConfirmModalEmitter = new EventEmitter<ConfirmModalDTO>();

  constructor() {

  }
}
