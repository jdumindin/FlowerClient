import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraSpeciesComponent } from './genera-species.component';

describe('GeneraSpeciesComponent', () => {
  let component: GeneraSpeciesComponent;
  let fixture: ComponentFixture<GeneraSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneraSpeciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneraSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
