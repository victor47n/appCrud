import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fbAuthenticate:AngularFireAuth) { }

  authentication(eLogin:boolean, name:string, email:string, password:string) {
    if(eLogin) {
      return this.loginEmail(email, password);
    } else {
      return this.createAccEmail(name, email, password);
    }
  }

  /* Quando a pessoa conectar, irá retornar os dados de autenticação do usuário */
  private loginEmail(email:string, password:string):Promise<auth.UserCredential> {
    
    /* Método que ira realizar o login com o e-mail */
    return this.fbAuthenticate.auth.signInWithEmailAndPassword(email, password);
    
  }

  private createAccEmail(name:string, email:string, password:string):Promise<auth.UserCredential> {

    /* Executar o método e retornar auth.UserCredential */
    return this.fbAuthenticate.auth.createUserWithEmailAndPassword(email, password)
            /* Onde salva o nome e a foto no perfil */
            .then(credentials => credentials.user.updateProfile({displayName: name, photoURL: null})
            .then(() => credentials));

  }
}
