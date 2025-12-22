import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosListaComponent } from './espacios-lista.component';

describe('EspaciosListaComponent', () => {
  let component: EspaciosListaComponent;
  let fixture: ComponentFixture<EspaciosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaciosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaciosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
