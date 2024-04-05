import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAwardDialogComponent } from './new-award-dialog.component';

describe('NewAwardDialogComponent', () => {
  let component: NewAwardDialogComponent;
  let fixture: ComponentFixture<NewAwardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAwardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAwardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
