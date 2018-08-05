import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CountriesListService } from '../countries-list.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
	selector: 'pop-countries-list',
	templateUrl: './countries-list.component.html',
	styleUrls: ['./countries-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CountriesListComponent implements OnInit {
	rows = [];
	temp = [];
	columns = [
		{ prop: 'name' },
		{ name: 'Population' },
		{ name: 'Flag' }
	];

	@ViewChild(DatatableComponent) table: DatatableComponent;

	constructor(private CountriesService: CountriesListService) { }

	ngOnInit() {
		this.getAllCountries();
	}

	private getAllCountries() {
		this.CountriesService.getCountries()
		.then((result: Array<object>) => {
			this.temp = [...result];

			this.rows = result;
		});
	}

	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.name.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

}
