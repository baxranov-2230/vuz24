import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdminLogService} from './admin-log.service';
import {PageFilterDTO} from '../../dto/pageFilterDTO';
import {AdmLogDTO} from './dto/admLogDTO';

declare var $: any;

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.scss'],
  providers: [AdminLogService]
})
export class AdminLogComponent implements OnInit, OnDestroy {

  public logList: Array<AdmLogDTO>;
  public selectedLog: AdmLogDTO;

  /* Table */
  public pageFilter: PageFilterDTO; // pagination filter
  public totalCount = 0; // total count of items
  public currentPage = 1; // current page
  public totalPageCount = 1; // total pages count
  public itemsPerPage = 15; // how many items on page
  public pageCountArray = [];
  /* Subsribtion */
  private logListSrvSubsciption: Subscription;

  constructor(private admLogSrv: AdminLogService) {
    this.pageFilter = new PageFilterDTO();
    this.selectedLog = null;
  }

  ngOnInit() {
    this.getLogList();
  }

  ngOnDestroy(): void {
    if (this.logListSrvSubsciption) {
      this.logListSrvSubsciption.unsubscribe();
    }
  }


  private getLogList() {
    this.pageFilter.from = (this.currentPage - 1) * this.itemsPerPage;
    this.pageFilter.to = this.itemsPerPage;
    this.logListSrvSubsciption = this.admLogSrv.getLogList(this.pageFilter).subscribe(
      (data) => {
        if (data) {
          this.logList = data.data;
          this.totalCount = data.totalCount;
          this.calculatePagination();
        }
      },
      error => console.log(error)
    );
  }

  public logInfo(dto: AdmLogDTO) {
    this.selectedLog = dto;
    $('#logInfoModalID').modal('show');
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
      this.getLogList();
    }
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.getLogList();
  }

  public goToNextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
      this.getLogList();
    }
  }

}
