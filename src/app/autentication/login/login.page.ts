import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  /* formGroup responsável pela autenticação do formulário */
  autenticationForm: FormGroup;

  /* Configuração que define se a ação é cadastro nova conta ou login */
  configs = {
    eLogin: true, /* indica se estamos executando login (true), nova conta(false) */
    primaryAction: 'Login', /* Rótulo do botão de ação primária */
    secundaryAction: 'Create an account.' /* Rótulo do botão da ação secundária */
  };

  /* Criando o validador do campo nome */
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm():void {
    this.autenticationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit():void {
    console.log("ta funcionando", this.autenticationForm);
  }

  toggleWindow():void {
    this.configs.eLogin = !this.configs.eLogin;

    if(this.configs.eLogin) {
      this.configs.primaryAction = 'Login';
      this.configs.secundaryAction = 'Create an account';
      /* Removendo as validações do campo nome, pois se não
      for removido, quando for fazer o login ele sempre irá
      informar que o campo name é obrigatório */
      this.autenticationForm.removeControl('name');
    } else {
      /* Adicionando o validador para o campo nome no controlador
      do formulário */
      this.autenticationForm.addControl('name', this.nameControl);
      this.configs.primaryAction = 'Register';
      this.configs.secundaryAction = 'Sign in';
    }
  }

  get name():FormControl {
    return <FormControl>this.autenticationForm.get('name');
  }

  get email():FormControl {
    return <FormControl>this.autenticationForm.get('email');
  }

  get password():FormControl {
    return <FormControl>this.autenticationForm.get('password');
  }

}
