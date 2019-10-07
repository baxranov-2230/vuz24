import {Component, OnInit} from '@angular/core';
import {AdminDashboardService} from "./admin-dashboard.service";
import {AdmDashBoardDTO} from "./dto/admDashBoardDTO";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [AdminDashboardService]
})
export class AdminDashboardComponent implements OnInit {
  public dashBoardDTO: AdmDashBoardDTO;


  constructor(private admDashboardService: AdminDashboardService) {
    this.dashBoardDTO = new AdmDashBoardDTO();
  }

  ngOnInit() {
    this.getStatistics();
  }


  public getStatistics() {
    this.admDashboardService.getDashBoardStatistics().subscribe(
      (data) => {
        if (data.state === '1') {
          this.dashBoardDTO = JSON.parse(data.data) as AdmDashBoardDTO;
        } else {

        }
      },
      error => console.log(error)
    );
  }

}
