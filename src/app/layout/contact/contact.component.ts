import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public lat = 41.3495038;
  public lng = 69.2132321;
  public isUzl;

  constructor(private location: Location) { }

  ngOnInit() {
    if (this.location.path().split('/')[1] === "uzl") {
      this.isUzl = true;
    } else {
      this.isUzl = false;
    }
  }
}
