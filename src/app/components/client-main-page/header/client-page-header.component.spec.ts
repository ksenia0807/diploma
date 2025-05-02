import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientPageHeaderComponent } from './client-page-header.component';

describe('ClientPageHeaderComponent', () => {
  let component: ClientPageHeaderComponent;
  let fixture: ComponentFixture<ClientPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
