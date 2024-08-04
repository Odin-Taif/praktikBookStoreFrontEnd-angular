import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookModalComponent } from './editbook-modal.component';

describe('EditbookModalComponent', () => {
  let component: EditbookModalComponent;
  let fixture: ComponentFixture<EditbookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditbookModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
