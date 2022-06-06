import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { WeatherService } from '../service/weather-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  chart = [];
  username !: string;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    private _weather: WeatherService) {}

  ngOnInit() {
    this.getData();
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  getData():void{
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        console.log("ERROR DATA USERS")
      }
    });
  }
}