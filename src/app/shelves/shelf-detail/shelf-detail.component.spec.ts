import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfDetailComponent } from './shelf-detail.component';

describe('ShelfDetailComponent', () => {
  let component: ShelfDetailComponent;
  let fixture: ComponentFixture<ShelfDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShelfDetailComponent]
    });
    fixture = TestBed.createComponent(ShelfDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
