import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationsWebComponent } from './prestations-web.component';

describe('PrestationsWebComponent', () => {
  let component: PrestationsWebComponent;
  let fixture: ComponentFixture<PrestationsWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationsWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationsWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
