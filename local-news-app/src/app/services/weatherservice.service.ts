import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeatherService {
    base_url = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/';

    constructor(private http: HttpClient) { }

    getLocationDetails(isLocationAllowed, lat: any, lon: any) {
        if (isLocationAllowed) {
            return this.http.get(`${this.base_url}api/location/search/?lattlong=${lat},${lon}`);
        } else {
            return this.http.get(`${this.base_url}api/location/search/?query=Philadelphia`);
        }
    }

    getWeatherDetails(id: any) {
        return this.http.get(`${this.base_url}api/location/${id}/`)
    }


}