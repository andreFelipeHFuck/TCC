import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedAngular } from './shared-angular';

describe('SharedAngular', () => {
  let component: SharedAngular;
  let fixture: ComponentFixture<SharedAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedAngular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
