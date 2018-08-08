import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CountDto } from '../../dto/countDto';
import { ProfileDto } from '../../dto/profileDto';
import { LocalStorageSecurity } from '../../util/localStorageSecurity';
import { CommonKey } from '../../util/commonKey';
import { ImageDto } from '../../dto/imageDto';
import { NewsDto } from '../../dto/newsDto';
declare var $;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [ ProfileService ]
})
export class MyProfileComponent implements OnInit {

  private from: number = 0;
  private amount: number = 9;
  public savedNews: Array<NewsDto>;
  public user: ProfileDto;
  public isImgReady: Boolean = false;
  public isImgChosen: Boolean = false;
  public isEditing: Boolean = false;
  public image: ImageDto;
  public src:string;

  constructor(private profileService: ProfileService) {
    this.user = new ProfileDto();
    this.savedNews = [];
  }

  ngOnInit() {
    this.user.firstName = LocalStorageSecurity.getItem(CommonKey.NAME);
    this.user.lastName = LocalStorageSecurity.getItem(CommonKey.SURNAME);
    this.getSavedNews();
  }

  private getSavedNews() {
    var count = new CountDto();
    count.from = this.from;
    count.to = this.amount;
    this.from += this.amount;

    this.profileService.getSavedNews(count).subscribe(
      (data) => {
        for (let x of data) {
          try {
            x.imgSrc = $(x.content).find('img')[0].src;
          } catch (e) {
              console.log('Could not find <img>!');
          }
        }
        this.savedNews = this.savedNews.concat(data);
        console.log(data);
      },
      error => console.log(error)
    );
  }

  public onSelect(e) {
    this.src = e;
    this.isImgChosen = true
  }

  public removeImg() {
    this.isImgReady = false;
    this.isImgChosen = false;
  }

  public saveImg() {
    this.isImgReady = true;
    var file = this.dataURLtoFile(this.src, 'a.png');

    this.profileService.createImage(file).subscribe(
      (data) => {
        this.image = data;
        this.src = data.imageLink;
        this.updateEmployeeImg();
      },
      error => console.log(error)
    );
  }

  public updateEmployeeImg() {
    var profile = new ProfileDto();
    profile.imgLink = this.image.imageName;
    this.profileService.updateMyImage(profile).subscribe(
      (data) => {
        console.log(data);
      },
      error => console.log(error)
    );
  }

  public dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  public goToTop() {
    window.scrollTo(0, 0);
  }

  public startEditing() {
    this.isEditing = true;
  }
}