import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../service/endereco.service';
import { TokenStorageService } from '../service/token-storage.service';
import { EnderecoRequest } from '../model/EnderecoRequest';
import { Endereco } from '../model/Endereco';
import { CepServiceService } from '../service/cep-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {


  enderecoRequest: EnderecoRequest = {street: "", neighborhood: "", cep: "", city: "", state: "", number:"", userId: -1}
  errorMsgs: string[] = [];
  title = 'Create Endereco';
  private enderecoId?: number;


  constructor(
    private router: Router,
    private enderecoService: EnderecoService,
    private tokenService: TokenStorageService,
    private activatedRoute: ActivatedRoute,

    private cepService: CepServiceService
  ) { }


  ngOnInit(): void {
    this.enderecoId = this.activatedRoute.snapshot.params['enderecoId'] as number;
    if (this.enderecoId) {
      this.title = 'Update contact';
      this.enderecoService.findById1({'address_id': this.enderecoId})
        .subscribe({
          next: (data) => {
            this.enderecoRequest = this.transform(data);
          }
        });
    }
  }


  cancel() {
    this.router.navigate(['EnderecoList']);
  }


  save() {
    this.enderecoRequest.userId = this.tokenService.getUserId;
    this.enderecoService.saveAddress({body: this.enderecoRequest})
      .subscribe({
        next: () => {
          this.router.navigate(['EnderecoList']);
        },
        error: (err) => {
          this.errorMsgs = err.error.validationErrors;
        }
      });
  }

  private transform(endereco: Endereco): EnderecoRequest {
    return <EnderecoRequest> {
      id: endereco.id!,
      userId: endereco.id!,
      cep: endereco.cep,
      street: endereco.street!,
      neighborhood: endereco.neighborhood!,
      city: endereco.city!,
      number: endereco.number!,
      state: endereco.state!
      
    }
  }

  consultaCep(valor: any, Endereco: any){
    this.cepService.buscar(valor).subscribe((dados)=> this.populaForm(dados,Endereco));
  }

  populaForm(dados:any, form: FormControl){
    form.setValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      numero : this.enderecoRequest.number,
      uf: dados.uf
    })
  }
}
