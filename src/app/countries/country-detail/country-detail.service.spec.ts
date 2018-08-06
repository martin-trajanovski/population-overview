import { TestBed, inject } from '@angular/core/testing';

import { CountryDetailService } from './country-detail.service';

describe('CountryDetailService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CountryDetailService]
		});
	});

	it('should be created', inject([CountryDetailService], (service: CountryDetailService) => {
		expect(service).toBeTruthy();
	}));
});
