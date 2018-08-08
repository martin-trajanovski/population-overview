import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CountriesListService } from '../countries/countries-list.service';

@Component({
	selector: 'pop-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	allCountries = [];
	countryWithHighestFemaleMaleRatioByYear;
	highestFemaleToMaleRatio = [];
	dashboardDetailsLoaded = false;

	criteriaForm: FormGroup;

	// Parameters from population.io
	minYear = 1950;
	maxYear = 2100;
	minAge = 0;
	maxAge = 100;

	// chart options
	colorScheme = {
		domain: ['#A10A28', '#5AA454']
	};

	// bar chart options
	fiveCountriesWithHighestRatio: any[] = [];

	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showXAxisLabel = true;
	xAxisLabel = 'Year';
	showYAxisLabel = true;
	yAxisLabel = 'Population';

	colorSchemeBar = {
		domain: ['#5AA454', '#A10A28']
	};

	constructor(private CountriesService: CountriesListService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.getAllCountries();

		this.criteriaForm = this.formBuilder.group({
			yearCriteria: [null, [Validators.required, Validators.min(this.minYear), Validators.max(this.maxYear)]],
			ageCriteria: [null, [Validators.required, Validators.min(this.minAge), Validators.max(this.maxAge)]],
		});
	}

	private getAllCountries(year: number = 2018, age: number = 20) {
		this.CountriesService.getAllCountriesPopulationByYearAndAge(year, age)
		.then((result: Array<object>) => {
			this.allCountries = result;

			this.countryWithHighestFemaleMaleRatioByYear = this.bigestFemaleMaleRatio(this.allCountries);

			this.highestFemaleToMaleRatio = [
				{
					name: 'Females',
					value: this.countryWithHighestFemaleMaleRatioByYear.females
				},
				{
					name: 'Males',
					value: this.countryWithHighestFemaleMaleRatioByYear.males
				}
			];

			const tempCountriesArray = [...this.allCountries];

			this.getFiveHighestFemaleMaleRatioCountries(tempCountriesArray);
		});
	}

	private getFiveHighestFemaleMaleRatioCountries(countries) {
		this.fiveCountriesWithHighestRatio = [];
		for (let i = 0; i < 5; i++) {
			const countryWithHighestRatio = this.bigestFemaleMaleRatio(countries);

			countries.splice(countries.indexOf(countryWithHighestRatio), 1);

			console.log(countryWithHighestRatio);

			this.fiveCountriesWithHighestRatio.push({
				name: countryWithHighestRatio.country,
				series: [
					{
						name: 'Males',
						value: countryWithHighestRatio.males
					},
					{
						name: 'Females',
						value: countryWithHighestRatio.females
					}
				]
			});

			this.dashboardDetailsLoaded = true;
		}
	}

	bigestFemaleMaleRatio(items: Array<any>) {
		return items.reduce((l, e) => e.females / e.males > l.females / l.males ? e : l);
	}

	onSubmit({yearCriteria, ageCriteria}) {
		this.getAllCountries(yearCriteria, ageCriteria);

		this.criteriaForm.reset();
	}

}
