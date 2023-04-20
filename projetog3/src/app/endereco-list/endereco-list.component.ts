import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnderecoService } from '../service/endereco.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Endereco } from '../model/Endereco';

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.css']
})
export class EnderecoListComponent implements OnInit {


  
  endereco: Endereco[] = [];
  private enderecoIdToDelete?: number;

  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
    private tokenService: TokenStorageService

  ) { }


  ngOnInit(): void {
    this.fetchAllAdresses();
  }

  newContact() {
    this.router.navigate(['Endereco']);
  }

  private fetchAllAdresses(){
    this.enderecoService.findAll({"user_id": this.tokenService.getUserId}).subscribe({
      next: (data) => {
        this.endereco = data;
      }
    })
  }


  editAddress(id: number | undefined){
    this.router.navigate(['Endereco', id]);
  }

  delete(id: number | undefined) {
    // this.contactIdToDelete = id;
  }

  cancelDelete() {
    this.enderecoIdToDelete = undefined;
  }

  confirmDelete() {
    if (this.enderecoService) {
      this.enderecoService.delete({'address_id': this.enderecoIdToDelete!})
        .subscribe({
          next: () => {
            this.fetchAllAdresses();
          }
        });
    }
  }
}
