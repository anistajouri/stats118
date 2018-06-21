import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/cluster', title: 'Cluster',  icon: 'storage', class: '' },
    { path: '/profiles', title: 'Profiles Clients',  icon:'assignment_ind', class: '' },
    { path: '/departproxi', title: 'reporting/département',  icon:'location_on', class: '' },
    //{ path: '/device', title: 'Recherches desktop/mobile',  icon:'important_devices', class: '' },
   // { path: '/inverse', title: 'Recherches inverses',  icon:'call', class: '' },
    { path: '/reports', title: 'Rapports mensuels',  icon:'assignment', class: '' },
    { path: '/bot', title: '118712StatBot',  icon:'chat', class: 'active-pro' },
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
