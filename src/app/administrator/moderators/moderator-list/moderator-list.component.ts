import { Component, OnInit } from '@angular/core';
import { ModeratorService } from '../../../services/moderator.service';
import { CountDto } from '../../../dto/countDto';
import { ProfileDto } from '../../../dto/profileDto';

@Component({
  selector: 'app-moderator-list',
  templateUrl: './moderator-list.component.html',
  styleUrls: ['./moderator-list.component.scss'],
  providers: [ModeratorService]
})
export class ModeratorListComponent implements OnInit {

  public moderators: Array<ProfileDto>;
  private from: number = 0;
  private amount: number = 9;
  private isEndOfMdrts: Boolean = false;

  constructor(private mdrtService: ModeratorService) {
    this.moderators = [];
  }

  ngOnInit() {
    this.getModeratorsList();


    var flag = this;
    window.onscroll = (function() {
      if(!flag.isEndOfMdrts && document.getElementById('mainBody').offsetHeight <=
                                          window.pageYOffset + window.innerHeight) {
        flag.getModeratorsList();
      }
    });
  }

  private getModeratorsList() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    this.from += this.amount;

    this.mdrtService.getModerators(count).subscribe(
      (data) => {
        this.moderators = this.moderators.concat(data);
        if (data.length < this.amount) {
          this.isEndOfMdrts = true;
        }
        console.log(data);
      },
      error => console.log(error)
    );
  }
}