import { Component, OnInit } from '@angular/core';
import { Usuario } from '../services/usuario';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private user:Usuario = new Usuario();
  private title:string="New User";

  constructor(private userService:UserService, private router:Router,private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.edit();
  }

  store():void{
  	//console.log(this.user);
    this.userService.create(this.user).subscribe(
      response=>
      {
         swal.fire('Nuevo Usuario',`Usuario:${this.user.nombre}, creado con exito.!`, 'success')
        this.router.navigate(['/usuarios'])

      }
      // function (response)
      // {
      //   console.log(response);
      // }
      );

  }

  edit():void{

    this.activedRoute.params.subscribe(
      params=>
      {
        let id=params['id']
        if(id)
        {
          this.userService.getUsuario(id).subscribe(response=>this.user=response)
        }
      })
  }

  update():void
  {

    this.userService.update(this.user)
    .subscribe( response=>{
        swal.fire('Actulizacion de Usuario',`Usuario:${this.user.nombre}, actualizado con exito.!`, 'success')
        this.router.navigate(['/usuarios'])
      
    }
    );
  }
  
  cancelNew():void
    {
      this.router.navigate(['/usuarios'])
    }
}
