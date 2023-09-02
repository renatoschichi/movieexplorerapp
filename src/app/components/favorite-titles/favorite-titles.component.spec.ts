import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTitlesComponent } from './favorite-titles.component';

describe('FavoriteTitlesComponent', () => {
  let component: FavoriteTitlesComponent;
  let fixture: ComponentFixture<FavoriteTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTitlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
