import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopPage } from './desktop-page';

describe('DesktopPage', () => {
  let component: DesktopPage;
  let fixture: ComponentFixture<DesktopPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
