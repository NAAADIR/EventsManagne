import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsParticipeComponent } from './evenementsparticipe.component';

describe('EvenementsParticipeComponent', () => {
  let component: EvenementsParticipeComponent;
  let fixture: ComponentFixture<EvenementsParticipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementsParticipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementsParticipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
