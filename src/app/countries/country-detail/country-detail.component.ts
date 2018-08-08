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

	// pie chart options
	colorSchemePie = {
		domain: ['#5AA454', '#A10A28']
	};

	// bar chart options
	lastFiveYearsPopulation: any[] = [];

	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showXAxisLabel = true;
	xAxisLabel = 'Year';
	showYAxisLabel = true;
	yAxisLabel = 'Population';

	colorSchemeBar = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#2E86C1']
	};

	constructor(private activeRoute: ActivatedRoute, private countryService: CountryDetailService) { }

	ngOnInit() {
		this.country = this.activeRoute.snapshot.params['countryName'];

		this.getSelectedCountryDetails(this.country);

		this.getCountryPopulationGrowth(2018, this.country);
	}

	getSelectedCountryDetails(selectedCountry: string) {
		this.countryService.getCountryPopulationByYear('2018', selectedCountry)
		.then((result: Array<object>) => {
			const sumOfMales = this.populationSum(result, 'males');
			const sumOfFemales = this.populationSum(result, 'females');

			this.maleFemaleRatioData.push({name: 'Males', value: sumOfMales});
			this.maleFemaleRatioData.push({name: 'Females', value: sumOfFemales});
		});
	}

	getCountryPopulationGrowth(toYear: number, selectedCountry: string) {
		this.lastFiveYearsPopulation = [];

		this.countryService.getCountryPopulationGrowthInLastFiveYears(toYear, selectedCountry).subscribe((result) => {
			result.forEach(element => {
				const sumOfPopulation = this.populationSum(element, 'total');

				this.lastFiveYearsPopulation.push({
					name: element[0].year,
					value: sumOfPopulation
				});
			});
			this.countryDetailsLoaded = true;
		});
	}

	xAxisTickFormatting(value): string {
		return value.toString();
	}

	populationSum(items: Array<object>, prop: string) {
		return items.reduce((a, b) => {
			return a + b[prop];
		}, 0);
	}

}
