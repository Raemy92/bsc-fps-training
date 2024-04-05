import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyImageComponent } from './lazy-image.component';

describe('LazyImageComponent', () => {
  let component: LazyImageComponent;
  let fixture: ComponentFixture<LazyImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LazyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
