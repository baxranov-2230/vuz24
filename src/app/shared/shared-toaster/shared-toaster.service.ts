import {EventEmitter, Injectable} from '@angular/core';
import {SharedToasterDTO} from './dto/sharedToasterDTO';

@Injectable()
export class SharedToasterService {

  startSharedToasterEmitter = new EventEmitter<SharedToasterDTO>();

  constructor() {
  }
}
