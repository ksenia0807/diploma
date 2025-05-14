import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialistProfilePageComponent } from './specialist-profile-page.component';

describe('SpecialistProfilePageComponent', () => {
  let component: SpecialistProfilePageComponent;
  let fixture: ComponentFixture<SpecialistProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistProfilePageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
