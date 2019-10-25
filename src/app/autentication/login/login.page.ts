import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { Options } from 'selenium-webdriver/ie';


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

  private nameTemp:string

  constructor(private navCtrl:NavController, private serviceAuthentication:AuthenticationService, private fb:FormBuilder, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm():void {
    this.autenticationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(provider:string):Promise<void> {
    console.log("ta funcionando", this.autenticationForm.value);

    const loading = await this.loading();

    if(this.configs.eLogin) {
      this.nameTemp = "";
    } else {
      this.nameTemp = this.autenticationForm.get('name').value;
    }

    try {
      const credential = await this.serviceAuthentication.authentication(this.configs.eLogin,
        this.nameTemp, this.autenticationForm.get('email').value,
        this.autenticationForm.get('password').value);

        this.navCtrl.navigateForward('task-list');
    } catch(e) {
      console.log("Ocorreu o seguinte erro: ", e);

      this.toast({
        message: e.message
      });
    } finally {
      loading.dismiss();
    }
  };

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

  async loading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: "Autenticando..."
    });

    await loading.present();

    return loading;
  }

  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok',
      ...options
    });

    await toast.present();

    return toast;
  }

}
