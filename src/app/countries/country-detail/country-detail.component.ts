import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDetailService } from './country-detail.service';

@Component({
	selector: 'pop-country-detail',
	templateUrl: './country-detail.component.html',
	styleUrls: ['./country-detail.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CountryDetailComponent implements OnInit {
	maleFemaleRatioData = [];
	country: string;
	countryDetailsLoaded = false;

	// chart options
	colorScheme = {
		domain: ['#5AA454', '#A10A28']
	};

	constructor(private activeRoute: ActivatedRoute, private countryService: CountryDetailService) { }

	ngOnInit() {
		this.country = this.activeRoute.snapshot.params['countryName'];

		this.getSelectedCountryDetails(this.country);
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
