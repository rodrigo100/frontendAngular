import { Component, OnInit } from '@angular/core';
import { Cliente } from '../services/cliente';
import { ClientService } from '../services/client.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal  from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponentClient implements OnInit {


	private client:Cliente = new Cliente();
  private titleNew:string="New Client";
  constructor(private clienteService:ClientService, private router:Router,private activeRouter:ActivatedRoute)
  {

  }

  ngOnInit()
  {
    this.edit();
  }

  store():void{

   this.clienteService.create(this.client).subscribe(
     // response=>console.log(response)
               response=>
               {
                   swal.fire('Nuevo Cliente',`Cliente:${this.client.nombre}, creado con exito.!`, 'success')
                   this.router.navigate(['/clientes'])
               }



     )};

  edit():void{
    
      this.activeRouter.params.subscribe(
        params=>{

            let id= params['id']
            if(id)
            {
              this.clienteService.getClient(id).subscribe(response=>this.client=response);
            }
          
        }
        );

  }
  
  update():void
  {
     this.clienteService.update(this.client)
     .subscribe(response=>{
       swal.fire('Actualizacion de Cliente',`Cliente: ${this.client.nombre}, actualizado con exito.!`,'success')
       this.router.navigate(['/clientes'])

     })
         
  }
   cancelNew():void
  	{
  		this.router.navigate(['/clientes'])
  	}

}
