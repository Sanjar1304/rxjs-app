import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from './services/auth.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements  OnInit {

  constructor(public auth: AuthStore,
              private router: Router) {}


  ngOnInit() {}


  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  
  
}
