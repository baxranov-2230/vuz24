import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
    setTimeout(() => {
      if (window.innerHeight > document.getElementById('notFound').scrollHeight) {
        document.getElementById('notFound').style.height = "100vh";
      }      
    }, 500);
  }

  public goBack() {
    this.location.back();
  }
}