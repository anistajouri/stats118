import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/localite', title: 'Recherches de localité',  icon: 'location_on', class: '' },
    { path: '/proximite', title: 'Recherches de proximité',  icon:'explore', class: '' },
    { path: '/device', title: 'Recherches desktop/mobile',  icon:'important_devices', class: '' },
    { path: '/inverse', title: 'Recherches inverses',  icon:'call', class: '' },
    { path: '/profile', title: 'Profiles',  icon:'assignment_ind', class: '' },{ path: '/bilans', title: 'Rapports de recherches',  icon:'assignment', class: '' },
    { path: '/statbot', title: '118712StatBot',  icon:'chat', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
