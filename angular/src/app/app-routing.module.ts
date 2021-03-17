import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { ModuleComponent } from './content/modules/module/module.component';
import { ModulesComponent } from './content/modules/modules.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'modules', component: ModulesComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: ':id', component: ModuleComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
