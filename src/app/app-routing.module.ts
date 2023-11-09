import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiaComponent } from './noticia/noticia.component';
import { FilterComponent } from './filter/filter.component';
import { ScrapComponent } from './scrap/scrap.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard'; 
import { SearchTypeComponent } from './search-type/search-type.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'noticia', component: NoticiaComponent, canActivate: [authGuard] },
  { path: 'filtro_noticia', component: FilterComponent, canActivate: [authGuard] },
  { path: 'buscar_noticias', component: ScrapComponent, canActivate: [authGuard] },
  { path: 'error_page', component: ErrorPageComponent, canActivate: [authGuard] },
  { path: 'tipo_busqueda', component: SearchTypeComponent, canActivate: [authGuard] },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
