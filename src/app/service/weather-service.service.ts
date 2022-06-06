import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) {}

  daysWeather() {
    const urlAPI =
      "https://api.openweathermap.org/data/2.5/forecast/daily?q=Lima,es&cnt=7&units=metric&appid=b6907d289e10d714a6e88b30761fae22";
    return this._http.get(urlAPI);
  }
}
