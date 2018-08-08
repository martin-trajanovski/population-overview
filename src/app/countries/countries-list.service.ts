import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CountriesListService {
	countries: Array<object> = [];
	countriesPopulationUrl = environment.api;

	constructor(private http: HttpClient) { }

	getAllCountriesPopulationByYearAndAge(year: number, age: number) {
		return new Promise(resolve => {
			this.http.get(`${this.countriesPopulationUrl}/population/${year}/aged/${age}`)
			.subscribe((result: Array<object>) => {
				this.countries = result;

				resolve(this.countries);
			});
		});
	}
}
