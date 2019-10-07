import {Component, OnInit} from '@angular/core';
import {LocalStorageSecurity} from '../util/localStorageSecurity';
import {CommonKey} from '../util/commonKey';
import {Router} from '@angular/router';
import {ConfirmModalService} from '../shared/confirm-modal/confirm-modal.service';
import {SharedToasterService} from '../shared/shared-toaster/shared-toaster.service';
import {NewsLangService} from '../services/news-lang.service';
import {NewsTypeService} from '../services/news-type.service';
import {AttendService} from '../services/attend.service';
declare var $: any;

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
  providers: [ConfirmModalService, SharedToasterService, NewsLangService, NewsTypeService, AttendService]
})

export class AdministratorComponent implements OnInit {

  public name: string;
  public surname: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#navbar').toggleClass('move');
        $('#nameDrop').toggleClass('showMe');
      });
    });

    if (document.getElementById('sidebar') && window.innerHeight < document.getElementById('sidebar').scrollHeight) {
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
