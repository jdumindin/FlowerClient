import { Routes } from '@angular/router';
import { GeneraComponent } from './genera/genera.component';
import { SpeciesComponent } from './species/species.component';
import { HomeComponent } from './home/home.component';
import { GeneraSpeciesComponent } from './genera/genera-species.component';
import { LoginComponent } from './auth/login.component';
import { CreateComponent } from './create/create.component';

export const routes: Routes = [
    {path:'genera', component:GeneraComponent},
    {path:'species', component:SpeciesComponent},
    {path:'create', component:CreateComponent},
    {path:'genera-species/:id', component:GeneraSpeciesComponent},
    {path:'login', component:LoginComponent},
    {path:'', component:HomeComponent, pathMatch:'full'}
];