import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Signupcomponent } from './components/signupcomponent/signupcomponent';
import { Resetcomponent } from './components/resetcomponent/resetcomponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Home } from './components/home/home';
import { LoaderComponent } from './shared/loader-component/loader-component';
import { NavComponent } from './shared/components/nav-component/nav-component';

@NgModule({
  declarations: [
    App,
    Logincomponent,
    Signupcomponent,
    Resetcomponent,
    Home,
    LoaderComponent,
    NavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
