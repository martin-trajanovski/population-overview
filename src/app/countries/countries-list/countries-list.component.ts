import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CountriesListService } from '../countries-list.service';

@Component({
	selector: 'pop-countries-list',
	templateUrl: './countries-list.component.html',
	styleUrls: ['./countries-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CountriesListComponent implements OnInit {
	rows = [];
	temp = [];
	criteriaForm: FormGroup;

	// Parameters from population.io
	minYear = 1950;
	maxYear = 2100;
	minAge = 0;
	maxAge = 100;

	@ViewChild(DatatableComponent) table: DatatableComponent;

	constructor(private CountriesService: CountriesListService,
				private router: Router,
				private formBuilder: FormBuilder) { }

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
			this.temp = [...result];

			this.rows = result;
		});
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.country.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	onCountryRowClick(event) {
		if (event.type === 'click') {
			this.router.navigate(['/reports', event.row.country]);
		}
	}

	onSubmit({yearCriteria, ageCriteria}) {
		this.getAllCountries(yearCriteria, ageCriteria);

		this.criteriaForm.reset();
	}

}
