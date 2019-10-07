import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SharedToasterService} from './shared-toaster.service';
import {SharedToasterDTO} from './dto/sharedToasterDTO';

@Component({
  selector: 'app-shared-toaster',
  templateUrl: './shared-toaster.component.html',
  styleUrls: ['./shared-toaster.component.scss']
})
export class SharedToasterComponent implements OnInit, OnDestroy {
  // toaster types:  success, warning, error
  private sharedToasterSrvSubscription: Subscription;

  public toasterDTOList: SharedToasterDTO[];

  constructor(private sharedToasterSrv: SharedToasterService) {
    this.toasterDTOList = [];
  }


  ngOnInit() {
    this.sharedToasterSrvSubscription = this.sharedToasterSrv.startSharedToasterEmitter.subscribe((data) => {
      if (data) {
        this.toasterDTOList.push(data);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sharedToasterSrvSubscription) {
      this.sharedToasterSrvSubscription.unsubscribe();
    }
  }

  public removeItemFromList(event) {
    this.toasterDTOList.forEach((item, index) => {
      if (item.id === event.toString()) {
        this.toasterDTOList.splice(index, 1);
      }
    });
  }


}
