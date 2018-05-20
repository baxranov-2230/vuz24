import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

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