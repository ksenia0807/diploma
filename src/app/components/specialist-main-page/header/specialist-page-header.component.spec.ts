import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialistPageHeaderComponent } from './specialist-page-header.component';

describe('SpecialistPageHeaderComponent', () => {
  let component: SpecialistPageHeaderComponent;
  let fixture: ComponentFixture<SpecialistPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistPageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
