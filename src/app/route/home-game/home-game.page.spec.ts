import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeGamePage } from './home-game.page';

describe('HomeGamePage', () => {
  let component: HomeGamePage;
  let fixture: ComponentFixture<HomeGamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
