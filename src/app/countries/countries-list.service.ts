import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CountriesListService {
	countries: Array<object> = [];
	companiesListUrl = environment.api;

	constructor(private http: HttpClient) { }

	getCountries() {
		return new Promise(resolve => {
			if (this.countries && this.countries.length > 0) {
				resolve(this.countries);
			} else {
				this.http.get(`${this.companiesListUrl}/all`)
				.subscribe((result: Array<object>) => {
					this.countries = result;

					resolve(this.countries);
				});
			}
		});
	}
}
