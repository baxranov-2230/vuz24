import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileDto } from '../../dto/profileDto';
import { ProfileService } from '../../services/profile.service';
import { LocalStorageSecurity } from '../../util/localStorageSecurity';
import { CommonKey } from '../../util/commonKey';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
  providers: [ProfileService]
})
export class SignInModalComponent implements OnInit {

  public profile: ProfileDto;
  public isRegReady: Boolean = false;
  public ndPassword: string = "";
  @Output() isEntered = new EventEmitter<Boolean>();

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profile = new ProfileDto();

  	this.changeCloseBtn();
  }

  public changeCloseBtn() {
    var flag = this;
    var close: HTMLElement = <HTMLElement>document.querySelector('.icon-close');
    document.getElementById('logintab').onclick = function () {
      flag.profile = new ProfileDto();
      close.removeAttribute('style');
    };
    document.getElementById('registertab').onclick = function () {
      flag.profile = new ProfileDto();
      close.style.background = '#fff';
    };
  }

  public authorization() {
    this.profileService.authorization(this.profile).subscribe(
      (data) => {
        console.log(data);
        if (data.state === 1) {
          LocalStorageSecurity.setItem(CommonKey.TOKEN, data.token);
          LocalStorageSecurity.setItem(CommonKey.NAME, data.firstName);
          LocalStorageSecurity.setItem(CommonKey.SURNAME, data.lastName);
          LocalStorageSecurity.setItem(CommonKey.IMG, data.imgLink);
          this.isEntered.emit(true);
          document.getElementById("login-close-btn").click();
        } else {
          this.errorOccured();
          this.profile = new ProfileDto();
        }
      },
      error => console.log(error)
    );
  }

  public registration() {
    try {
      this.isRegReady = this.checkRegReadiness();
    } catch (error) { }
    if (this.isRegReady) {
      this.profileService.registration(this.profile).subscribe(
        (data) => {
          console.log(data);
          if (data.state === 1) {
            LocalStorageSecurity.setItem(CommonKey.TOKEN, data.token);
            LocalStorageSecurity.setItem(CommonKey.NAME, this.profile.firstName);
            LocalStorageSecurity.setItem(CommonKey.SURNAME, this.profile.lastName);
            this.isEntered.emit(true);
            document.getElementById("login-close-btn").click();
          } else {
            this.errorOccured();
          }
          this.profile = new ProfileDto();
        },
        error => console.log(error)
      );
    } else {
      console.log('error');
      this.errorOccured();
    }
  }

  public checkRegReadiness() {
    if (this.profile.password === this.ndPassword) {
      return true;
    }
  }

  public errorOccured(){
   		document.getElementById('modal-itself').classList.add('wobble');
			setTimeout(function () {
				document.getElementById('modal-itself').classList.remove('wobble');
			}, 1100);
  }
}