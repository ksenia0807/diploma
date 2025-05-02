import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialistMainPageComponent } from './specialist-main-page.component';

describe('SpecialistMainPageComponent', () => {
  let component: SpecialistMainPageComponent;
  let fixture: ComponentFixture<SpecialistMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistMainPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
