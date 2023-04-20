import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  cities: any[];

  selectedCityCode: string;

  constructor() {
    this.cities = [
      {name: 'Bebidas', code: 'Bebidas'},
      {name: 'Refeições', code: 'Refeicoess'},
  ];
  this.selectedCityCode = ""
  }

  ngOnInit(): void {
  }

}
