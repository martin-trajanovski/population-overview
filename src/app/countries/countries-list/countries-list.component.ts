import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CountriesListService } from '../countries-list.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

@Component({
	selector: 'pop-countries-list',
	templateUrl: './countries-list.component.html',
	styleUrls: ['./countries-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CountriesListComponent implements OnInit {
	rows = [];
	temp = [];

	@ViewChild(DatatableComponent) table: DatatableComponent;

	constructor(private CountriesService: CountriesListService, private router: Router) { }

	ngOnInit() {
		this.getAllCountries();
	}

	private getAllCountries(year: number = 2018, age: number = 20) {
		this.CountriesService.getCountries(year, age)
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

	onShowNewResultsClick(year: string, age: string) {
		this.getAllCountries(parseInt(year, 10), parseInt(age, 10));
	}

}
