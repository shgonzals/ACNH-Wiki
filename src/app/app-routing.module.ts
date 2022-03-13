import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { VillagersListComponent } from './villagers/villagers-list.component';
import { VillagerFormComponent } from './villagers/villager-form/villager-form.component';

const routes: Routes = [
    { path: 'villagers', component: VillagersListComponent},
    { path: 'villagers/:id', component: VillagerFormComponent},
    { path: 'villager', component: VillagerFormComponent},
    { path: 'welcome', component: WelcomeComponent},
    { path: '', redirectTo: 'welcome', pathMatch : 'full'},
    { path: '**', redirectTo: 'welcome', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
