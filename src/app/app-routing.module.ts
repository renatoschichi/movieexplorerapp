import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';

const routes: Routes = [
  { path: 'inicio', component: MovieSearchComponent },
  { path: 'sobrenos', component: AboutusComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
