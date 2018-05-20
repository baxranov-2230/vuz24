import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moderator-detail',
  templateUrl: './moderator-detail.component.html',
  styleUrls: ['./moderator-detail.component.scss']
})
export class ModeratorDetailComponent implements OnInit {

  private moderatorId: number;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.forEach(params => {
      this.moderatorId = parseInt(params["id"]);
    });

    if (this.moderatorId) {
      this.getModerator();
    }
  }

  private getModerator() {
    console.log(this.moderatorId);
    
  }
}