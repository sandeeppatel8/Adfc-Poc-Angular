import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private _weatherService: WeatherService) {
    this.getWeather();
  }

  ngOnInit(): void {

  }

  getWeather(): void {
    var letWeather = this._weatherService.AuthonticateUser().subscribe({
      next: (resp: any) => {
        console.log('Resp=>', resp);
      },
      error: (err: { message: any }) => {
        console.log(err.message);
      }
    });
    console.log('Weather=>', letWeather);
  }

}
