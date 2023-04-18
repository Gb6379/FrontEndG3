import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.displayModal= false;
    this.displayModal2= false;
  }

  newChange(): void {
    this.router.navigateByUrl('Login');
  }

  ngOnInit(): void {
  }

  displayModal: boolean;

  displayModal2: boolean;

  showModalDialog() {
      this.displayModal = true;
  }

  showModalDialog2() {
    this.displayModal2 = true;
}
}
