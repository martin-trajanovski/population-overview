import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'pop-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	navbarExpanded = false;
	showMenu = true;

	constructor(private router: Router) { }

	ngOnInit() {}

	toggleNavigation() {
		this.navbarExpanded = !this.navbarExpanded;
	}

}
