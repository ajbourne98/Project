import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { LecturesComponent } from './content/modules/lectures/lectures.component';
import { ModuleComponent } from './content/modules/module/module.component';
import { ModulesComponent } from './content/modules/modules.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'modules', component: ModulesComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: ':id', component: ModuleComponent },
      { path: ':id/lectures', component: LecturesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
