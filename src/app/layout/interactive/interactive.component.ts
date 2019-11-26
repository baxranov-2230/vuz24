import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss']
})
export class InteractiveComponent implements OnInit {

  public lang: String;
  public isUzl: boolean = false;
  public isUzk: boolean = false;
  public isRu: boolean = false;
  public isEn: boolean = false;

  constructor(private location: Location) { }

  ngOnInit() {
    if (location.pathname.split("/")[1] === 'uzl') {
      this.isUzl = true;
      this.isUzk = false;
      this.isRu = false;
      this.isEn = false;
      this.lang = "uzl"
    } else if (location.pathname.split("/")[1] === 'uzk') {
      this.isUzl = false;
      this.isUzk = true;
      this.isRu = false;
      this.isEn = false;
      this.lang = "uzl"
    } else if (location.pathname.split("/")[1] === 'ru') {
      this.isUzl = false;
      this.isUzk = false;
      this.isRu = true;
      this.isEn = false;
      this.lang = "ru";
    } else if (location.pathname.split("/")[1] === 'en') {
      this.isUzl = false;
      this.isUzk = false;
      this.isRu = false;
      this.isEn = true;
      this.lang = "en";
    }
  }

}
