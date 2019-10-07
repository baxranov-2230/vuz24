import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SharedToasterDTO} from '../dto/sharedToasterDTO';
import {SharedToasterService} from "../shared-toaster.service";

@Component({
  selector: 'app-shared-toaster-item',
  templateUrl: './shared-toaster-item.component.html',
  styleUrls: ['./shared-toaster-item.component.scss']
})
export class SharedToasterItemComponent implements OnInit {

  @Input() toasterDTO: SharedToasterDTO;
  @Output() removeItem = new EventEmitter<string>();

  constructor(private sharedToasterSrv: SharedToasterService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.show();
    }, 20);
  }


  public  show() {
    const x = document.getElementById(this.toasterDTO.id);
    x.classList.add('show');

    setTimeout(() => {
      x.className = x.className.replace('show', 'hide'); // TODO toaster-hide yozish garak
      this.removeItem.emit(this.toasterDTO.id);
    }, 3000);
  }


}
