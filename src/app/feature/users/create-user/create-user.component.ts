import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './shared/services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public formSend: FormGroup;

  nuevoUsuario = Object;

  @ViewChild('content') content: ElementRef;
  @ViewChild('principal') divPricipal: ElementRef;

  mostrar = function () {
    const ul = this.renderer.createElement('ul');
    const li1 = this.renderer.createElement('li');
    const li2 = this.renderer.createElement('li');
    const li3 = this.renderer.createElement('li');
    const negrita = this.renderer.createElement('b');

    this.renderer.removeClass(this.divPricipal.nativeElement, 'd-none');

    const l1Text = this.renderer.createText(`Nombre del participante: ${this.nuevoUsuario.name}`);
    const li2Text = this.renderer.createText(`Trabajo del participante: ${this.nuevoUsuario.job}`);
    const li3Text = this.renderer.createText(`Id del participante: ${this.nuevoUsuario.id}`);

    this.renderer.appendChild(ul, li1);
    this.renderer.appendChild(ul, li2);
    this.renderer.appendChild(ul, li3);
    this.renderer.appendChild(li1, l1Text);
    this.renderer.appendChild(li2, li2Text);
    this.renderer.appendChild(negrita, li3Text);
    this.renderer.appendChild(li3, li3Text);
    this.renderer.appendChild(this.content.nativeElement, ul);
  };

  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private us: UsersService,
    public renderer: Renderer2,
  ) {}
  ngOnInit(): void {
    this.formSend = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
    });
  }

  enviar() {
    this.us.createUser(this.formSend.value).subscribe((res: any) => {
      this.nuevoUsuario = res;
      console.warn(this.formSend.value);
      console.log(this.nuevoUsuario, typeof this.nuevoUsuario);
      console.log(this.nuevoUsuario.name);
      this.mostrar();
      Swal.fire(`Usuario: ${this.nuevoUsuario.name} creado - Redireccionando`);
      this.redirectToListUsers();
    });
  }

  /**
   * Este método no se puede modificar
   * */
  public redirectToListUsers(): void {
    this.router.navigateByUrl('/list');
  }
}
