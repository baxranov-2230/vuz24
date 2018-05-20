import { Component, OnInit, Input } from '@angular/core';
import { ProfileDto } from '../../../../dto/profileDto';

@Component({
  selector: 'app-moderator-item',
  templateUrl: './moderator-item.component.html',
  styleUrls: ['./moderator-item.component.scss']
})
export class ModeratorItemComponent implements OnInit {

  @Input() moderator: ProfileDto;

  constructor() { }

  ngOnInit() {
  }
}