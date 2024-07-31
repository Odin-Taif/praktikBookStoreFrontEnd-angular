import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitatListComponent } from './citat-list.component';

describe('CitatListComponent', () => {
  let component: CitatListComponent;
  let fixture: ComponentFixture<CitatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitatListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
