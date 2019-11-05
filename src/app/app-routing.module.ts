import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './autentication/login/login.module#LoginPageModule' },  { path: 'task-list', loadChildren: './tasks/pages/task-list/task-list.module#TaskListPageModule' },
  { path: 'task-save', loadChildren: './tasks/pages/task-save/task-save.module#TaskSavePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
