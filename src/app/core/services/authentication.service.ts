import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  stateAuthentication$: Observable<firebase.User>;

  constructor(private fbAuthenticate:AngularFireAuth) {
    this.stateAuthentication$ = this.fbAuthenticate.authState;
   }

  authentication(eLogin:boolean, name:string, email:string, password:string): Promise<auth.UserCredential> {
    if(eLogin) {
      return this.loginEmail(email, password);
    } else {
      return this.createAccEmail(name, email, password);
    }
  }

  logout(): Promise<void> {
    return this.fbAuthenticate.auth.signOut();
  }

  get isAuthenticate():Observable<boolean> {
    return this.stateAuthentication$.pipe( map( user => user !== null ) );
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
