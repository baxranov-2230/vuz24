import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageSecurity } from '../util/localStorageSecurity';
import { CommonKey } from '../util/commonKey';

declare var $;

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {
  
  public name: string;
  public surname: string;

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
            $('#navbar').toggleClass('move');
            $('#nameDrop').toggleClass('showMe');
        });
    });

    if (window.innerHeight < document.getElementById('sidebar').scrollHeight) {
      document.getElementById('sidebar').style.height = "100%";
    }

    this.name = LocalStorageSecurity.getItem(CommonKey.NAME);
    this.surname = LocalStorageSecurity.getItem(CommonKey.SURNAME);
  }

  public showFullMenu(id: number) {
    if (document.getElementById('homeSubmenu' + id).classList.contains('show')) {
      document.getElementById('homeSubmenu' + id).classList.remove('show');
      document.getElementById('menuArrow' + id).classList.remove('fa-angle-down');
      document.getElementById('menuArrow' + id).classList.add('fa-angle-right');
    } else {
      document.getElementById('homeSubmenu' + id).classList.add('show');
      document.getElementById('menuArrow' + id).classList.remove('fa-angle-right');
      document.getElementById('menuArrow' + id).classList.add('fa-angle-down');
    }
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['log-in']);
  }
}