import { Component, OnInit } from '@angular/core';
import { ModeratorService } from '../../../services/moderator.service';
import { ProfileDto } from '../../../dto/profileDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-moderator',
  templateUrl: './create-moderator.component.html',
  styleUrls: ['./create-moderator.component.scss'],
  providers: [ModeratorService]
})
export class CreateModeratorComponent implements OnInit {

  public isMdrtReady: Boolean = false;

  constructor(private mdrtService: ModeratorService, private router: Router) { }

  ngOnInit() {
  }

  public createMdrt() {
    var moderator = new ProfileDto();
    moderator.firstName = (<HTMLInputElement>document.getElementById("fName")).value;
    moderator.lastName = (<HTMLInputElement>document.getElementById("lName")).value;
    moderator.login = (<HTMLInputElement>document.getElementById("login")).value;
    moderator.password = (<HTMLInputElement>document.getElementById("pwd")).value;
    moderator.birthDate = (<HTMLInputElement>document.getElementById("bDate")).value;
    moderator.phoneNumber = (<HTMLInputElement>document.getElementById("phNumber")).value;
    moderator.email = (<HTMLInputElement>document.getElementById("email")).value;

    this.mdrtService.createModerator(moderator).subscribe(
      (data) => {
        console.log(data);
        
        if (data.state === 1) {
          setTimeout(() => {
            this.router.navigate(["administrator/moderators"]);
          }, 500);
        }
      },
      error => {
        if (error.error.state === -1) {
          alert(error.error.errMsg)
        }
      }
    );
  }

  public checkMdrtData() {
    if ((<HTMLInputElement>document.getElementById("fName")).value.length > 2 &&
        (<HTMLInputElement>document.getElementById("lName")).value.length > 2 &&
        (<HTMLInputElement>document.getElementById("login")).value.length > 2 &&
        (<HTMLInputElement>document.getElementById("pwd")).value.length > 2) {
      this.isMdrtReady = true;
    }
  }
}