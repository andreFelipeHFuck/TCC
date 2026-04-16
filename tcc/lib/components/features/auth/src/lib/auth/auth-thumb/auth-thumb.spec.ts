import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthThumb } from './auth-thumb';

describe('AuthThumb', () => {
  let component: AuthThumb;
  let fixture: ComponentFixture<AuthThumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthThumb],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthThumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
