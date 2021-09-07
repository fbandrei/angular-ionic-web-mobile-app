import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabComponent } from './tab.component';

const routes: Routes = [

  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' }, 
  {
    path: 'tabs',
    component: TabComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('../account/account.module').then( m => m.AccountModule)
      },
      {
        path: 'sell',
        loadChildren: () => import('../account/account.module').then( m => m.AccountModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../account/account.module').then( m => m.AccountModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then( m => m.AccountModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRoutingModule {}
