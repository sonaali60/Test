import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weatherservice.service';
import { concatMap, mergeMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {

  longitude = 0;
  latitude = 0;
  weather_icon = '';
  weather_icon_url = 'https://www.metaweather.com/static/img/weather/';
  weather_state = '';
  today = new Date();
  showUi = false;

  constructor(private service: WeatherService) {}
  ngOnInit() {
    this.getLocation();
  }

  getDetails(isLocationAllowed) {
    this.service.getLocationDetails(isLocationAllowed, this.latitude, this.longitude).pipe(concatMap((items: any) => {
      if (items) {
        return this.service.getWeatherDetails(items[0].woeid);
      }
    })).subscribe((data: any) => {
      if (data) {
        if (data) {
          this.weather_state = data.consolidated_weather[0].weather_state_name;
          this.weather_icon = `${this.weather_icon_url}${data.consolidated_weather[0].weather_state_abbr}.svg`;
          this.showUi = true;
        }
      }
    })
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.getDetails(true);
      }, () => {
        this.getDetails(false);
      }, { timeout: 10000 })
    } else {
      alert("No support for geolocation");
    }
  }
}
