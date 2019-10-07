import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdmNewsNotPubDTO} from '../dto/admNewsNotPubDTO';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NewsService} from '../../../../services/news.service';
import {CountDto} from "../../../../dto/countDto";
import {AdminNewsNotPubService} from "../admin-news-not-pub.service";
import {SharedToasterService} from "../../../../shared/shared-toaster/shared-toaster.service";
import {SharedToasterDTO} from "../../../../shared/shared-toaster/dto/sharedToasterDTO";

declare var $: any;
@Component({
  selector: 'app-admin-news-not-pub-item',
  templateUrl: './admin-news-not-pub-item.component.html',
  styleUrls: ['./admin-news-not-pub-item.component.scss']
})
export class AdminNewsNotPubItemComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
  }

  // @Input() newsItem: AdmNewsNotPubDTO;
  // @Output() isPublished: EventEmitter<any> = new EventEmitter();
  //
  // public imgSrc: string;
  // public content: SafeHtml;
  // public target: string;
  // public time: string;
  // public date: string;
  //
  // constructor(private sanitizer: DomSanitizer, private admNewsNotPubSrv: AdminNewsNotPubService,
  //             private sharedToasterSer: SharedToasterService) {
  // }
  //
  // ngOnInit() {
  //
  //   setTimeout(() => {
  //     document.getElementById('target' + this.newsItem.id).setAttribute('data-target', '#newsInModal' + this.newsItem.id);
  //   }, 500);
  //
  //   try {
  //     if ($(this.newsItem.content).find('img').length > 0 && $('<p>' + this.newsItem.content + '</p>').find('img').length > 0) {
  //       this.imgSrc = $('<p>' + this.newsItem.content + '</p>').find('img')[0].src;
  //       this.content = this.sanitizer.bypassSecurityTrustHtml(this.newsItem.content);
  //     } else {
  //       this.imgSrc = 'assets/images/logo.png';
  //     }
  //
  //   } catch (e) {
  //     this.imgSrc = 'assets/images/logo.png';
  //   }
  // }
  //
  // public publishNews() {
  //   document.getElementById("closeBtn" + this.newsItem.id).click();
  //   setTimeout(() => {
  //     this.admNewsNotPubSrv.publishNews(this.newsItem.nlId.toString()).subscribe(
  //       (data) => {
  //         if (data.state === 1) {
  //           this.isPublished.emit(true);
  //         }
  //       },
  //       error => console.log(error)
  //     );
  //   }, 100);
  // }
  //
  // public deleteNews() {
  //   document.getElementById("closeBtn" + this.newsItem.id).click();
  //   setTimeout(() => {
  //     this.admNewsNotPubSrv.deleteNews(this.newsItem.nlId.toString()).subscribe(
  //       (data) => {
  //         if (data.state === 1) {
  //           this.isPublished.emit(true);
  //         }
  //       },
  //       error => console.log(error)
  //     );
  //   }, 100);
  // }
  //
  // public disableNews() {
  //   document.getElementById('closeBtn' + this.newsItem.id).click();
  //
  //   const newsId = this.newsItem.nlId;
  //   const reason = (<HTMLInputElement>document.getElementById('returnReason')).value;
  //
  //   const obj = {reason: reason};
  //
  //   setTimeout(() => {
  //     this.admNewsNotPubSrv.disableNews(newsId.toString(), JSON.stringify(obj)).subscribe(
  //       (data) => {
  //         if (data.state === 1) {
  //           this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Успешно', 'Новость отвергнуто', 'success'));
  //         } else if (data.state === -1) {
  //           this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошло ошибка', 'warning'));
  //         }
  //       },
  //       error => this.sharedToasterSer.startSharedToasterEmitter.emit(new SharedToasterDTO('Ошибка', 'Произошло ошибка', 'error'))
  //     );
  //   }, 100);
  // }

}
