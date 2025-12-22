import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEspaciosComponent } from './abm-espacios.component';

describe('AbmEspaciosComponent', () => {
  let component: AbmEspaciosComponent;
  let fixture: ComponentFixture<AbmEspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbmEspaciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
