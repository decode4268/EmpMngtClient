import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Signupcomponent } from './components/signupcomponent/signupcomponent';
import { Resetcomponent } from './components/resetcomponent/resetcomponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [App,Logincomponent, Signupcomponent, Resetcomponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
