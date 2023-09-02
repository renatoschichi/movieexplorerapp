import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { movieReducer } from './store/movie/movie.reducer';
import { MovieEffects } from './store/movie/movie.effects';
import { FavoriteTitlesComponent } from './components/favorite-titles/favorite-titles.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    FooterComponent,
    NavbarComponent,
    AboutusComponent,
    FavoriteTitlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({ movies: movieReducer }),
    EffectsModule.forRoot([MovieEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
