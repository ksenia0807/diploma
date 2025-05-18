import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialistReviewsComponent } from './specialist-reviews.component';

describe('SpecialistReviewsComponent', () => {
  let component: SpecialistReviewsComponent;
  let fixture: ComponentFixture<SpecialistReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistReviewsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialistReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
