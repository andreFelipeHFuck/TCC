import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiProfileImage } from './li-profile-image';

describe('LiProfileImage', () => {
  let component: LiProfileImage;
  let fixture: ComponentFixture<LiProfileImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiProfileImage],
    }).compileComponents();

    fixture = TestBed.createComponent(LiProfileImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
