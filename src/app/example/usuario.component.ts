import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import { User } from './usuario.json';
import {UsuarioService} from './usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
  // styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

	arrayCurso:string[]=['Javascript','Nodejs','Vue.js','React.js'];
	disponible:boolean=true;
  // usuarios:Usuario[]=
  // [
  //   { id:1,nombre:"anonimous",apellido:"Perez",email:"jojo@gmail.com",createAt:"2017-10-10"},
  //   { id:2,nombre:"anonimous",apellido:"Perez",email:"jojo@gmail.com",createAt:"2017-10-10"},
  //   { id:3,nombre:"anonimous",apellido:"Perez",email:"jojo@gmail.com",createAt:"2017-10-10"},
  // ];
   usuarios:Usuario[];
  constructor(private usuarioService:UsuarioService)
  {
  }

  ngOnInit()
  {
    // this.usuarios=User;
     // this.usuarios=this.usuarioService.getUsuarios(); 
     this.usuarioService.getUsuarios().subscribe(
        usuarios=>this.usuarios=usuarios
       );
  }
  setDisponible():void{

		// this.disponible=(this.disponible==true)?false:true;
		if(this.disponible==true)
			this.disponible=false;
		else
			this.disponible=true;
	}

}
