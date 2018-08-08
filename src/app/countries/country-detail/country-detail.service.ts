import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CountryDetailService {
	countryDetails = {};
	countryDetailsUrl = environment.api;

	constructor(private http: HttpClient) { }

	getCountryPopulationByYear(year: string, country: string) {
		return new Promise(resolve => {
			this.http.get(`${this.countryDetailsUrl}/population/${year}/${country}/`)
			.subscribe((result: object) => {
				this.countryDetails = result;

				resolve(this.countryDetails);
			});
		});
	}

	getCountryPopulationGrowthInLastFiveYears(toYear: number, country: string) {
		const multipleRequestsArray = [];

		for (let i = toYear; i > toYear - 5; i--) {
			multipleRequestsArray.push(this.http.get(`${this.countryDetailsUrl}/population/${i}/${country}/`));
		}

		return forkJoin(multipleRequestsArray);
	}
}
