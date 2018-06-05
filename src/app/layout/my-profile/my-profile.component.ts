import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CountDto } from '../../dto/countDto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [ ProfileService ]
})
export class MyProfileComponent implements OnInit {

  private from: number = 0;
  private amount: number = 9;

  constructor(private profileService: ProfileService, private location: Location) { }

  ngOnInit() {
    this.getSavedNews();
  }

  private getSavedNews() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    // count.lang = this.location.path().split('/')[1];
    this.from += this.amount;

    this.profileService.getSavedNews(count).subscribe(
      (data) => {
        console.log(data);
      },
      error => console.log(error)
    );
  }
}