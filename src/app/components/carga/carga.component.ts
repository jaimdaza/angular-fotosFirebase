import { Component, OnInit } from '@angular/core';
import { FileIntem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {

  archivos: FileIntem[] = [];
  estaSobreElemento: false;

  constructor(public _cargaImagenesService: CargaImagenesService) { }

  ngOnInit(): void {
  }

  cargarImagines(){
    this._cargaImagenesService.cargarImagenesFirebase(this.archivos);
  }

  pruebaSobreElemento(event){
      console.log('fueraaa');
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
