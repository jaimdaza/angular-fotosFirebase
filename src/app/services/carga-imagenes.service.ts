import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileIntem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGINES = 'img';

  constructor(private db: AngularFirestore) { }


  cargarImagenesFirebase(imagenes: FileIntem[]){
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
        item.estadoSubiendo = true;
        if (item.progreso >= 100){
          continue;
        }
        // tslint:disable-next-line: max-line-length
        const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGINES}/${item.nombreArchivo}`).put(item.archivo);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          (error) => console.log('error al subir', error)
          );
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            item.url = url;
            item.estadoSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url,
            });
          });
      }
  }

  private  guardarImagen(imagen: {nombre: string, url: string}){
    this.db.collection(`${this.CARPETA_IMAGINES}`).add(imagen);
  }
}
