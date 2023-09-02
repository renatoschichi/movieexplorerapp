import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { FavoriteTitlesComponent } from './components/favorite-titles/favorite-titles.component';

const routes: Routes = [
  { path: 'inicio', component: MovieSearchComponent },
  { path: 'sobrenos', component: AboutusComponent },
  { path: 'favoritos', component: FavoriteTitlesComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
