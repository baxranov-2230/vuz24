import {Component, OnInit} from '@angular/core';
import {LocalStorageSecurity} from "../../util/localStorageSecurity";
import {CommonKey} from "../../util/commonKey";
import {ProfileDto} from '../../dto/profileDto';
import {ProfileService} from '../../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [ProfileService]
})

export class LogInComponent implements OnInit {

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    if (window.innerHeight > document.getElementById('logInForm').scrollHeight) {
      document.getElementById('logInForm').style.height = "100vh";
    }

    document.getElementById("inputEmail").click();
  }

  public authorization() {
    var profile = new ProfileDto();
    profile.login = (<HTMLInputElement>(document.getElementById('inputEmail'))).value;
    profile.password = (<HTMLInputElement>(document.getElementById('inputPassword'))).value;

    this.profileService.authorization(profile).subscribe(
      (data) => {
        if (data.state === 1) {
          LocalStorageSecurity.setItem(CommonKey.TOKEN, data.token);
          LocalStorageSecurity.setItem(CommonKey.NAME, data.firstName);
          LocalStorageSecurity.setItem(CommonKey.SURNAME, data.lastName);
          LocalStorageSecurity.setItem(CommonKey.ROLE, data.roles[0].name);
          if (data.imgLink) {
            LocalStorageSecurity.setItem(CommonKey.PROFILE_IMG_LINK, data.imgLink);
          }
          if (data.isAdmin) {
            this.router.navigate(['administrator']);
          } else if (data.isModerator) {
            this.router.navigate(['administrator']);
          }
        } else {
          (<HTMLInputElement>(document.getElementById('inputEmail'))).value = '';
          (<HTMLInputElement>(document.getElementById('inputPassword'))).value = '';
          document.getElementById('wrongTryWarning').style.display = 'block';
        }
      },
      error => console.log(error)
    );
  }
}
