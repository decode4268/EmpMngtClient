import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Signupcomponent } from './components/signupcomponent/signupcomponent';
import { Resetcomponent } from './components/resetcomponent/resetcomponent';
import { Home } from './components/home/home';
import { AuthGuard } from './guards/auth-guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Logincomponent },
  { path: 'signup', component: Signupcomponent },
  { path: 'reset', component: Resetcomponent },
  { path: 'home', canActivate: [AuthGuard], component: Home },


  { path: '**', component: Logincomponent },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
