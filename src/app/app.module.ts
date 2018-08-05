import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { environment } from '../environments/environment';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
	{
		path: 'reports/:countryName',
		component: CountryDetailComponent
	},
	{
		path: 'reports',
		component: CountriesListComponent,
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: '',
		redirectTo: '/reports',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DropdownDirective,
		PageNotFoundComponent,
		CountriesListComponent,
		CountryDetailComponent,
		DashboardComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		NgProgressModule.forRoot({
			color: '#c3002f'
		}),
		NgProgressHttpModule,
		RouterModule.forRoot(
			appRoutes,
			{ useHash: true }
		), ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
