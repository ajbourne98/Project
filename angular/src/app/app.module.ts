import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClickOutsideModule } from 'ng-click-outside';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivitesComponent } from './activites/activites.component';
import { TodoComponent } from './activites/todo/todo.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { ModuleComponent } from './content/modules/module/module.component';
import { ModulesComponent } from './content/modules/modules.component';
import { LecturesComponent } from './content/modules/lectures/lectures.component';
import { MyStuffComponent } from './content/my-stuff/my-stuff.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ActivitesComponent,
    TodoComponent,
    ModalComponent,
    ContentComponent,
    HomeComponent,
    ModuleComponent,
    ModulesComponent,
    LecturesComponent,
    MyStuffComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
