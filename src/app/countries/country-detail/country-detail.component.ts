import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDetailService } from './country-detail.service';

@Component({
	selector: 'pop-country-detail',
	templateUrl: './country-detail.component.html',
	styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
	maleFemaleRatioData = [];
	countryDetailsLoaded = false;

	// chart options
	view: any[] = [600, 250];

	colorScheme = {
		domain: ['#5AA454', '#A10A28']
	};

	constructor(private activeRoute: ActivatedRoute, private countryService: CountryDetailService) { }

	ngOnInit() {
		const country = this.activeRoute.snapshot.params['countryName'];

		this.getSelectedCountryDetails(country);
	}

	getSelectedCountryDetails(selectedCountry: string) {
		this.countryService.getCountryPopulationByYear('2018', selectedCountry)
		.then((result: Array<object>) => {
			const sumOfMales = this.populationSum(result, 'males');
			const sumOfFemales = this.populationSum(result, 'females');

			this.maleFemaleRatioData.push({name: 'Males', value: sumOfMales});
			this.maleFemaleRatioData.push({name: 'Females', value: sumOfFemales});

			this.countryDetailsLoaded = true;
		});
	}

	populationSum(items: Array<object>, prop: string) {
		return items.reduce((a, b) => {
			return a + b[prop];
		}, 0);
	}

}
