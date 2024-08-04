import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitatComponent } from './citat.component';

describe('CitatComponent', () => {
  let component: CitatComponent;
  let fixture: ComponentFixture<CitatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
