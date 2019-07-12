import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent }  from './about/about.component';
import { ContactComponent }  from './contact/contact.component';
// import { UsuarioComponent } from './usuario/usuario.component';
// import {UsuarioService } from './usuario/usuario.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { ClientComponent } from './client/client.component';
import { UsersComponent } from './users/users.component';
import { FormComponent } from './users/forms/form.component';
import { FormComponentClient } from './client/forms/form.component';

import { FormsModule } from '@angular/forms'

const routes:Routes=[
{path:'',redirectTo:'/usuarios',pathMatch:'full'},
{path:'about',component:AboutComponent},
{path:'contact',component:ContactComponent},
// {path:'usua',component:UsuarioComponent},
{path:'clientes',component:ClientComponent},
{path:'usuarios',component:UsersComponent},
{path:'usuarios/newForm',component:FormComponent},
{path:'usuarios/newForm/:id',component:FormComponent},
{path:'clientes/newForm',component:FormComponentClient},
{path:'clientes/newForm/:id',component:FormComponentClient}




];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // UsuarioComponent,
    FormComponent,
    FormComponentClient,
    ContactComponent,
    AboutComponent,
    ClientComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
  // UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
